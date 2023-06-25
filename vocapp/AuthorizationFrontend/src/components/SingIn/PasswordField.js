import FieldUtilsBase, {getPasswordFieldAttributs} from "../formUtils";

export default class PasswordField extends FieldUtilsBase{
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            passwordIsHidden: true,
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