import { getPasswordFieldAttributs } from "../../formUtils";
import SingUpFieldUtils from "./FieldUtils";



export default class Password2Field extends SingUpFieldUtils{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            passwordIsHidden: true,
        }
        this.hashValidation = false;
    }
    primaryValidation(password){
        let valid = this.props.passworValue == password
        return {
            valid: valid,
            errors: valid? [] : ["Passwords are not the same"],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.passworValue !== this.props.passworValue) {
            const fakeEvent = { target: document.querySelector("#password2")  };
            this.handleOnBlur(fakeEvent)
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
}