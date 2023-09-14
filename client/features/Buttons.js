import React from 'react'
import { Button, Typography } from '@mui/material'

const Buttons = ({name, func, pulse, small}) => {
  return (
    <Button
      onClick={func}
      className={pulse}
  
      variant="contained"
    >
      <Typography className={pulse} color={"secondary"} sx={{ fontSize: small ? "null" : 30 }}>
        {name}
      </Typography>
    </Button>
  );
}

export default Buttons