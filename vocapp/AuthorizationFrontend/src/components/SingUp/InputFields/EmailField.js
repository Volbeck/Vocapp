import { emailValidator } from "../../../axios/urls";
import React from "react";
import SingUpFieldUtils from "./FieldUtils";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputAdornment from '@mui/material/InputAdornment';

export default class EmailField extends SingUpFieldUtils{
    constructor(props){
        super(props)
        // this.URL = emailValidator;
        this.attributs = {
            "InputProps":{
                startAdornment: (
                    <InputAdornment position="start">
                        <EmailOutlinedIcon sx={this.iconSize}/>
                    </InputAdornment>
                  ),
              },
        }
    }

    primaryValidation(email){
        let valid = /\S+@\S+\.\S+/.test(email);
        return {
            valid: valid,
            errors: valid? [] : ["Email address is invalid"],
        };
    }

}