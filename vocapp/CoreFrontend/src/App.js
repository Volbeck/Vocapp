import React from "react";
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import axios from "axios";
import authFetch from "./axios/interceptors/auth_interceptor";
import { useEffect } from "react";
import { SingInPage, UserData } from "./axios/urls";


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#16a085"
      },
    },
  });
  useEffect(async () => {
    
    try {
      const resp = await authFetch(UserData);
    } catch (error) {
      return window.location.href = SingInPage
      
    }
  }, []);
  function Plug(){
    return <HomePage/>
  }
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/folders/" />} />
        <Route path="/folders/" element={<Plug/>}/>
        <Route path="/modules/" element={<Plug/>}/>
        <Route path="/folder/:title/" element={<Plug/>}/>
        <Route path="/modul/:title/" element={<Plug/>}/>
      </Routes>
    </ThemeProvider>
    
  );
}


export default App;
