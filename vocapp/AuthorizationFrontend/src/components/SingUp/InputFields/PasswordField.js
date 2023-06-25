import { getPasswordFieldAttributs } from "../../formUtils";
import SingUpFieldUtils from "./FieldUtils";


export default class PasswordField extends SingUpFieldUtils{
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            passwordIsHidden: true,
        }
    }
    primaryValidation(password){
        let errors = [];
        let response = {};
        if (password.length < 8 | password.length > 64){errors.push("Password should be between 8 and 64 characters long.");}
        if (!/\d/.test(password)){errors.push("Password should have at least 1 number");}
        if (!/[a-zA-Z]/.test(password)){errors.push("Password should have at least 1 letter");}
        if (/[^a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)){errors.push("Password should contain only latin letters, numbers and special characters");}
        return {
            valid: !errors.length,
            errors: errors,
        }
    }
    getTextFieldAttributs(){
        return{
            ...super.getTextFieldAttributs(),
            ...getPasswordFieldAttributs(
                this.state.passwordIsHidden, 
                (value)=> this.setState({passwordIsHidden:value}))
        }
    }
    handleOnBlur(e){
        this.props.setPasswordValue(e.target.value)
        super.handleOnBlur(e)
    }
}