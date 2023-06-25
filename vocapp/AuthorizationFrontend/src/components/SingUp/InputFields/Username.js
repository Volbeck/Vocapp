import { usernameValidator } from "../../../axios/urls";
import SingUpFieldUtils from "./FieldUtils";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import React from "react";
import InputAdornment from '@mui/material/InputAdornment';

export default class UsernameField extends SingUpFieldUtils{
    constructor(props){
        super(props)
        this.URL = usernameValidator;
        this.attributs = {
            "InputProps":{
                startAdornment: (
                    <InputAdornment position="start">
                        <PermIdentityOutlinedIcon sx={this.iconSize}/>
                    </InputAdornment>
                  ),
              },
        }
    }

    primaryValidation(username){
        let valid = !(username.length > 150 || username.length < 3);
        return {
            valid: valid,
            errors: valid? [] : ["Username should have 3-150 characters"],
        };
    }
}