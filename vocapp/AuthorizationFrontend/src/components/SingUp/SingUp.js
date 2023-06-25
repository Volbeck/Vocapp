import React, { useState } from "react"
import { Box } from '@mui/system';
import SubmitButton from "../SubmitButton";
import { useImmer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';
import EmailField from "./InputFields/EmailField";
import PasswordField from "./InputFields/PasswordField";
import Password2Field from "./InputFields/Password2Field";
import UsernameField from "./InputFields/Username";
import { registerUser } from "../../axios/urls";
import axios from "axios";
import Loader from "../Loader/Loader"
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../App";
import { Fail } from "../StatePopups";


const SingUp = (props)=> {
    const [errors, setErorrs] = useImmer({})
    const [passworValue, setPasswordValue] = useState("")
    const [formIsSubmitting, setFormIsSubmitting] = useState(false);
    const FIELDS_ID = ['username','email','password','password2'];
    const [serverErorr, setServerError] = useState(false)
    const navigate = useNavigate();
    const Left = {
        "maxWidth": "40%",
        "float": "left"
    };
    const Right = {
        "maxWidth": "40%",
        "float": "right",
        "textAlign": "right"
    };
    const FieldsAttributs = {
        setErorrs: setErorrs,
        submitForm: Submit,
        nextField:nextField,
    }
    function nextField(id){
        let errorFieldIds = Object.keys(errors)
        for (let i = 0; i < errorFieldIds.length; i++) {
            if (errorFieldIds[i] !== id) {
              return errorFieldIds[i];
            }
        }
        return getFirstEmptyField()
    }
    function getFirstEmptyField(){
        for (let i = 0; i < FIELDS_ID.length; i++) {
            let fieldValue = document.querySelector(`#${FIELDS_ID[i]}`).value
            if (!fieldValue) {
              return FIELDS_ID[i];
            }
        }
    }
    function formIsValid(data) {
        if (!Object.values(data).every(value => Boolean(value))) {return false} //Check if form's fields are filled
        if (Object.keys(errors).length !== 0){return false} //Check if form's fields are correctly filled
        return true
    }
    async function Submit(){
        if (formIsSubmitting){return}
        let data = getFormData()
        if (!formIsValid(data)){return}

        setServerError(false)
        props.setIsSubmitted(false);
        setFormIsSubmitting(true);
        
        try {
            let response = await axios.post(registerUser, data);
            props.setIsSubmitted(true);
            redirectToSingIn()
            
        } catch (error) {
            console.log(error);
            setServerError(true);
        }
        finally{
            setFormIsSubmitting(false);
            
        }

    }
    function getFormData(){
        let data = {}
        for (let id of FIELDS_ID){
            data[id] = document.querySelector(`#${id}`).value;
        }
        return data;
        
    }
    const redirectToSingIn = () => {
        navigate(BASE_URL + 'singin/');
    };

    return (
        <>
            <h1>Create account</h1>
        
            <form noValidate id="SingUpForm">
                <Box sx={Left}>
                    <UsernameField {...FieldsAttributs} id="username" label="Username" />
                    <PasswordField {...FieldsAttributs} id="password"  label="Password" 
                    setPasswordValue={setPasswordValue}/>
                </Box>
                <Box sx={Right}>
                    <EmailField {...FieldsAttributs} id="email" label="Email"/>
                    <Password2Field {...FieldsAttributs} id="password2" label="Repeat Password"
                     passworValue={passworValue}/>
                </Box>
                <div className="clean"></div> 
                <br></br>
                <Errors errors={errors} mix={["password password2",]}/>
                <SubmitButton onClick={async ()=> await Submit()}/>
                <div className="clean"></div>
            </form>
            {formIsSubmitting && <Loader/>}
            {serverErorr && <Fail onClick={()=> this.props.setServerError(false)}/>}
        </>
    )
}





function Errors(props){
    if (Object.keys(props.errors) == 0){return}
    function renderFieldError(title, errors){

        const listErrors = errors.map(error =>
            <li key={uuidv4()}>
              {error}
            </li>
        );
        if (listErrors.length === 1){return listErrors }

        return (
            <li className="error">
                <div>{title}</div>
                <ul className="list">
                    {listErrors}
                </ul>
            </li>
        )
    }
    function renderError(errors){
        let ErrorsHTML = []
        for (const key in errors) {
            ErrorsHTML = [...ErrorsHTML, renderFieldError(key, errors[key])]
        }
        return ErrorsHTML
    }

    return(
        <ul class="errorlist">
            
            {renderError(props.errors)}      
        </ul>
    )
}




export default SingUp;