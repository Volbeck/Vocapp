import React, { useState } from "react";
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import {NavLink, Navigate, Route, Routes} from "react-router-dom";
import SingUp from "./components/SingUp/SingUp";
import SingIn from "./components/SingIn/SingIn";
import './axios/global.js';


export const BASE_URL = '/auth/'

function App() {
  const LoginBox = {
    "margin": "5% auto",
    "maxWidth": "650px",
    "background": "#FFF",
    "borderRadius": "2px",
    "boxShadow": "0 2px 4px rgba(0, 0, 0, 0.4)",
    "boxSizing": "border-box",
    "padding": "40px"
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#16a085"
      },
    },
  });
  const [SingUpIsSubmitted, setSingUpIsSubmitted] = useState(false)
  const mode = {
    marginLeft:7,
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={LoginBox}>
        <Box sx={mode}>
          <NavLink to={BASE_URL + "singin/"} className={"modeLink"}>Sing In</NavLink>
          <NavLink to={BASE_URL + "singup/"} className={"modeLink"}>Sing Up</NavLink>
        </Box>

        <Routes>
          <Route path="/" element={<Navigate to={'/auth/singup/'}/>}/>
          <Route path='/auth/singup/' element={<SingUp setIsSubmitted={setSingUpIsSubmitted} /> }/>
          <Route path='/auth/singin/' element={<SingIn  setIsSubmitted={setSingUpIsSubmitted} SingUpIsSubmitted={SingUpIsSubmitted}/>}/>
        </Routes>
      </Box>
      
    </ThemeProvider>
  );
}


export default App;
