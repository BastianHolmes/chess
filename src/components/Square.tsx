
import { Box, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';

interface Square {
  children: ReactNode
  black: boolean
}

const Square:React.FC<Square> = ({ children, black }) => {
  const { palette } = useTheme();
  return (
    <Box
      width="100%"
      height="100%"
      bgcolor={black ? palette.grey[700] : palette.grey[200]}
    >
      {children}
    </Box>
  )
}

export default Square