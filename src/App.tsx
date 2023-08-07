import { useEffect, useState } from "react";
import { gameSubject, initGame, resetGame } from "@/Chess/Game";
import Board from "@/components/Board";
import { Box, Button } from "@mui/material";


function App() {
  const [board, setBoard] = useState<object[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>();
  const [, setResult] = useState<string>();
  const [turn, setTurn] = useState<string>();

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe(game => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
    }
    )
    return () => subscribe.unsubscribe()
  }, [])
  console.log(board)
  return (
    <div className="app">
      <Box
        width="600px"
        height="600px"
        boxShadow="0 0 10px 5px white"
      >
        <Board board={board} turn={turn} />
      </Box>
      {isGameOver && (
        <Box
          position="absolute"
          top="70px"
          fontSize="36px"
          fontWeight="700"
          display="flex"
          justifyContent="space-between"
        >
          GAME OVER
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginLeft:"20px"
            }}
            onClick={() =>resetGame()}
          >New Game</Button>
        </Box>
      )}
    </div>
  )
}

export default App
