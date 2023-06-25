import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';


const SmileStyle = {fontSize:"80px", float:"left"}


function Template({children, color, onClick}){
    const style = {
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translate(-50%)',
        backgroundColor: color,
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        zIndex: '999',
        textAlign: 'center'
        
    }
    return (
        <div style={style}>
            <CloseOutlinedIcon
                sx={{float:"right", cursor:"pointer"}} 
                onClick={onClick}
            />
            {children}
	    </div>
    )
}
export function Success(props){
    return(
        <Template color={'rgb(57, 201, 101)'} onClick={props.onClick}>
            <SentimentSatisfiedOutlinedIcon sx={SmileStyle}/>
            <div style={{marginTop:"14px"}}>Registration successful!</div>
		    <div>Please check your email to confirm your registration.</div>
        </Template>
    )
}

export function Fail(props){
    return(
        <Template color={"#f11717"} onClick={props.onClick}>
            <SentimentDissatisfiedOutlinedIcon sx={SmileStyle}/>
            <div style={{marginTop:"8px"}}>We apologize for the inconvenience, but an error has occurred on the server.</div>
            <div>Please try again later or contact our support team for assistance.</div>
        </Template>
    )
}