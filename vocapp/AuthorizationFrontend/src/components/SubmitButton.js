import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react"

const SubmitButton = (props)=>{
    const style = {
        marginTop:1,
        "width": "120px",
      }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
        }}>
            <Button variant="contained" color="primary" disableElevation sx={style} onClick={props.onClick}>Submit</Button>
        </Box>
    )
}

export default SubmitButton;