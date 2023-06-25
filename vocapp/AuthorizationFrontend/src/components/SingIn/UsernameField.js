import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import FieldUtilsBase from "../formUtils";

export default class UsernameField extends FieldUtilsBase{
    constructor(props){
        super(props)
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
}