import FlexCenter from '@/ui components/FlexCenter'
import { useDrag, DragPreviewImage } from 'react-dnd'
import React from 'react'

interface Piece {
  piece: {
    type: string
    color: string
  } | null
  position: string
}

const Piece:React.FC<Piece> = ({ piece, position }) => {
  const { type, color } = piece ||  { type: '', color: '' };
  const [, drag, preview] = useDrag({
    type:"piece",
    item:
    {
        type: 'piece',
        id: `${position}_${type}_${color}`
      },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() }
    }
  })

  const pieceSvg = `./assets/Chess_Pieces_Sprite.svg#${type}_${color}`
  
  return (
    <> 
      <FlexCenter
        width="100%"
        height="100%"
        sx={{ cursor: 'grab' }}
        ref={drag}
      >
        <DragPreviewImage connect={preview} src={pieceSvg}/>
        <svg style={{minWidth:"20px", width:"70%", height:"70%"}}>
           <use xlinkHref={pieceSvg} />
        </svg>
    </FlexCenter>
  </>
  )
}

export default Piece