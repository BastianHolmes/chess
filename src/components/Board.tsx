import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import BoardSquare from './BoardSquare';

interface Board {
  board: string[];
  turn: string|null
}

const Board: React.FC<Board>= ({ board, turn }) => {
  const [currBoard, setCurrBoard] = useState([]);
  useEffect(() => {
    setCurrBoard(
      turn === 'w' ? board.flat() : board.flat().reverse() 
    )
  }, [board, turn])
  const getPosition = (i: number): {
    x: number,
    y:number
  } => {
    const x = turn === 'w' ? i % 8 :Math.abs((i % 8) - 7);
    const y = turn === 'w' ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
    
    return {x, y}
  }

  const isBlack = (i:number):boolean => {
    const { x, y } = getPosition(i);
    return (x + y) % 2 === 1
  }

  const getFinalPosition = (i:number) => {
    const { x, y } = getPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`
  }

  console.log(`${currBoard} is?`)
  return (
    <Box
    width="100%"
    height="100%"
    display="flex"
    flexWrap="wrap"
    position="relative"
    >
      {currBoard.map((piece, i: number) => (
        <Box 
          width= "12.5%"
          height="12.5%"
          key={i}>
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getFinalPosition(i)}
            />
        </Box>
      ))}
    </Box>
  )
}

export default Board