import React from 'react'
import {Box} from '@mui/material'
import FlexCenter from '@/ui components/FlexCenter';
import { move } from '../Chess/Game';

interface Promotion {
  promotion: {
    from: string;
    to: string;
    color: string;
  }
}

const promotionPieces = ['r', 'n', 'b', 'q'];

const Promotion:React.FC<Promotion> = ({promotion: {from, to, color}}) => {
  return (
    <FlexCenter
      position="absolute"
      top="250px"
      right="185px"
      width="250px"
      height="50px"
      flexDirection='row'
    >
      {promotionPieces.map((p, i) => 
        <Box
          key={i}
          width="100%"
          height="100%"
          bgcolor="white"
          sx={{ transform: "scale(1.5)" }}
          borderRadius="15px"
          onClick = {() =>move(from, to, p)}
        >
          <svg style={{maxWidth:"100%",  maxHeight:"100%", cursor:"pointer"}}>
            <use xlinkHref={`./assets/Chess_Pieces_Sprite.svg#${p}_${color}`} />
          </svg>
        </Box>
      )}
    </FlexCenter>
  )
}

export default Promotion