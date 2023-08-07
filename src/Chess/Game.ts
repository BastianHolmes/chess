import * as ChessJS from "chess.js";
import { BehaviorSubject } from "rxjs";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const chess = new Chess();

export const gameSubject = new BehaviorSubject({
  board: chess.board(),
  isGameOver: chess.isGameOver(),
  result: chess.isGameOver() ? getGameResult() : null,
  turn: chess.turn()
})

export function move(from: string, to: string, promotion?: string) {
  let tempMove = { from, to, promotion };
  if (promotion) {
    tempMove.promotion = promotion
  }
  const legalMove = chess.move(tempMove)
  if (legalMove) {
    updateGame()
  }
}

export function handleMove(from:string, to:string) {
  const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
  console.table(promotions)
  if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
      const pendingPromotion = { from, to, color: promotions[0].color }
      updateGame(pendingPromotion)
  }
  const { pendingPromotion }: any = gameSubject.getValue()

  if (!pendingPromotion) {
      move(from, to)
  }
}

export function initGame() {
  const savedGame = localStorage.getItem('savedGame');
  if (savedGame) {
    chess.load(savedGame)
  }
  updateGame()
}

export function resetGame() {
  chess.reset()
  updateGame()
}


const updateGame = (pendingPromotion?: object) => {
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver: chess.isGameOver(),
    result: chess.isGameOver() ? getGameResult() : null,
    turn: chess.turn()
  }
  localStorage.setItem('savedGame', chess.fen())

  gameSubject.next(newGame)
}

function getGameResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "w" ? "BLACK" : "WHITE"
    return `CHECKMATE - WINNER: ${winner}`
  } else if (chess.isDraw()){
    let reason = "50 MOVES RULE"
    
    if (chess.isStalemate()) {
      reason = "STALEMATE"
    }
    else if (chess.isThreefoldRepetition()) {
      reason = "REPETITION"
    }
    else if (chess.isInsufficientMaterial()) {
      reason = "INSUFFICIAL MATERIAL"
    }

    return `REASON : ${reason}`
  } 
  return `UNKNOWN REASON`
}