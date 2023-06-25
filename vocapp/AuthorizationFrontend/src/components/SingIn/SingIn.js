import React, { useState } from "react"
import SubmitButton from "../SubmitButton";
import { Box } from "@mui/system";
import { Success } from "../StatePopups";
import axios from "axios";
import { Login } from "../../axios/urls";
import Loader from "../Loader/Loader"
import PasswordField from "./PasswordField";
import UsernameField from "./UsernameField";


const SingIn = (props)=>{
    const [formIsSubmitting, setFormIsSubmitting] = useState(false);
    const [LogInISFailed, setLogInIsFailed] = useState(false);
    const HomePageUrl = 'http://127.0.0.1:8000/';
    const InputStyle = {
        "width":"50%",
        "textAlign":"center",
        marginTop:3
    };
    const FieldsAttributs = {
        sx:InputStyle,
        nextField: nextField,
        submitForm: Submit,
    };
    function nextField(id){
        return id==='username'? 'password' : 'username'
    }
    async function Submit(){
        
        let data = getFormData();
        if (!FormIsFilled(data)){return}
        setFormIsSubmitting(true);
        setLogInIsFailed(false);
        try{
            let response = await axios.post(Login, data);
            localStorage.setItem("token", response.data.token)
            redirectToHomePage()

        }
        catch(error){
            console.log(error);
            setLogInIsFailed(true);
        }
        finally{
            setFormIsSubmitting(false);
        }
        

    }
    function FormIsFilled(data) {
        if (!Object.values(data).every(value => Boolean(value))) {return false}
        return true
    } 
    function getFormData(){
        return{
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
        }
    }
    function redirectToHomePage(){
        window.location.href = HomePageUrl;
    }
    async function refresh(){
        try{
            let response = await axios.post("auth/jwt/refresh/")
            let result = await axios.get("auth/users/", {
                headers: {
                  'Authorization': `Bearer ${response.data.token}`,
                }
            })
            console.log(result)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <h1>Login in</h1>
            <form>
                
                <Box sx={{"textAlign":"center", marginTop:2, marginBottom:5}}>
                    {LogInISFailed && <Box sx={{color:"error.main", marginTop:5}}>Username or password entered incorrectly</Box>}
                    <UsernameField id="username" label="Username"{...FieldsAttributs}/>
                    <br></br>
                    <PasswordField id="password" label="Password" {...FieldsAttributs}/>
                </Box>
                <SubmitButton onClick={async ()=> await Submit()}/>
                
            </form>
            {props.SingUpIsSubmitted && <Success onClick={()=> props.setIsSubmitted(false)}/>}
            {formIsSubmitting && <Loader/>}
        </>
    );
}

export default SingIn