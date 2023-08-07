import React, {useEffect, useState} from 'react';
import Square from '@/components/Square';
import Piece from '@/components/Piece';
import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';
import { handleMove, gameSubject } from "@/Chess/Game";
import Promotion from "@/components/Promotion"


interface BoardSquare {
  piece: {
    type: string;
    color: string;
  } | null;
  black: boolean;
  position: string;
}

const BoardSquare:React.FC<BoardSquare> = ({ piece, black, position }) => {
  const [promotion, setPromotion] = useState(null); 
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item:any) => {
      const [fromPosition] = item.id.split('_')
      handleMove(fromPosition, position)
    }
  })
  useEffect(() => {
    const subscribe = gameSubject.subscribe(
      ({pendingPromotion }) => {
        pendingPromotion?.to === position ?  setPromotion(pendingPromotion) : setPromotion(null)
      }
    )
    return () => subscribe.unsubscribe()
  }, [position])
  return (
    <Box
      width="100%"
      height="100%"
      ref={drop}
    >
      <Square black = {black}>
        {promotion ?
          (<Promotion promotion={promotion}/>) : piece ?
            (<Piece piece={piece} position={position} />) : null}
      </Square>
    </Box>
  )
}

export default BoardSquare