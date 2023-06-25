import { Button } from "@mui/material";
import React from "react";


function Template({children}){
    const style = {
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(57, 201, 101)',
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        zIndex: '999',
        textAlign: 'center'
        
    }
    return (
        <div className={style}>
            {children}
	    </div>
    )
}
export function Success({children}){
    return(
        <Template>
            <Button></Button>
        </Template>
    )
}

