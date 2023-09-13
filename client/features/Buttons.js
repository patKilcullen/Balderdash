import React from 'react'
import { Button, Typography } from '@mui/material'

const Buttons = ({name, func, pulse}) => {
  return (
    <Button onClick={func} className={pulse}
      sx={{ fontSize: 30 }}
      variant="contained" >
      <Typography className={pulse} color={"secondary"} sx={{ fontSize: 30 }}>
        {name}
      </Typography>
    </Button>
  );
}

export default Buttons