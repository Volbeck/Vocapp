import React, {Component} from "react";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {TextField } from '@mui/material';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

export default class FieldUtilsBase extends Component{
    constructor(props){
        super(props);
        this.iconSize = {"font-size":"large"};
        this.fieldname = props.id;
        this.handleOnBlur = this.handleOnBlur.bind(this)
    }
    handleOnBlur(){
        this.props.submitForm();
    }
    handleKeyPress = (e)=>{
        if (e.key !=="Enter"){return }
        let focus_id = this.props.nextField(this.fieldname)
        if (!focus_id){
            document.querySelector(`#${this.fieldname}`).blur()
            return
        }
        document.querySelector(`#${focus_id}`).focus()

    }
    getTextFieldAttributs(){
        return{
            variant: "standard",
            ...this.props,
            ...this.attributs,
            onKeyPress: this.handleKeyPress,
            onBlur: this.handleOnBlur, 
        }
    }
    render(){ 
        return <TextField {...this.getTextFieldAttributs()} />
    }
}

export function getPasswordFieldAttributs(passwordIsHidden, onClick){
    const IconStyle = {
        "font-size": "20px",
        "cursor":"pointer",
    }
    const IconAttributs={
        sx:IconStyle,
        onClick: ()=>onClick(!passwordIsHidden),
    }
    return {
        type: passwordIsHidden? "password": "text",
        "InputProps":{
            endAdornment: (
              <InputAdornment position="end">
                {passwordIsHidden ? <VisibilityOutlinedIcon {...IconAttributs} />: <VisibilityOffOutlinedIcon {...IconAttributs}/>}
              </InputAdornment>
            ),
            startAdornment: (
                <InputAdornment position="start">
                    <KeyOutlinedIcon sx={{"font-size":"large"}}/>
                </InputAdornment>
              ),
          }
    }
}


