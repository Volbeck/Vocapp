import axios from "axios";
import FieldUtilsBase from "../../formUtils";


export default class SingUpFieldUtils extends FieldUtilsBase{

    constructor(props){
        super(props);
        this.errors = undefined;
        this.state = {
            ...this.state,
            fieldFunctionalData:{
                "error":false,
                "success":false,
                "focused":false,
            },
            prevFuncData:[],
        };
        this.style ={
            marginTop:3,
            ...props.sx,
        };
        this.hashValidation = true
        
    }


    handleFocus = ()=> {
        let data = this.state.fieldFunctionalData;
        data.focused = true;
        this.setState({
            fieldFunctionalData: data,
        })
    }


    async handleOnBlur(e){
        await this.updateFieldData(e.target.value)
        this.setErrors()
        super.handleOnBlur()
    }


    updateFieldData = async (fieldValue) => {
        if (!fieldValue){
            this.resetFieldData();
            return;
        }

        let data = this.hashValidation? this.getDataByFieldValue(fieldValue): undefined;
        if (data){
            this.setState({
                fieldFunctionalData: data,
            });
            this.errors = data.errorList;
            return;
        }
        
        this.formFieldData(fieldValue, await this.validate(fieldValue));
    }


    resetFieldData(){
        this.setState({
            fieldFunctionalData:{
                "error": false,
                "success": false,
                "focused": false,
                "errorList": undefined,
            }
        });
        this.errors = undefined
    }


    getDataByFieldValue = (fieldValue) => {
        let data = this.state.prevFuncData.find(funcData => funcData.fieldValue === fieldValue);
        return data ? data.data : undefined
    }
    

    async validate(fieldValue){
        let primaryValidationData = this.primaryValidation(fieldValue);
        
        if (!primaryValidationData.valid || "URL" in this == false || "fieldname" in this == false){
            
            return primaryValidationData
        }
        
        let secondaryValidationData = await this.serverValidation(fieldValue);
        return secondaryValidationData;
        
    }


    async serverValidation(fieldValue){
        try {
            return (await axios.post(this.URL, {[this.fieldname]: fieldValue})).data;

        } catch (error) {
            console.log(error);
            return false;
        }
        
    }


    primaryValidation(fieldValue){
        return {valid: true}
    }


    formFieldData(fieldValue, validationData){
        let valid = validationData.valid;
        this.errors = validationData.errors;
        let data = {
            "error": !valid,
            "success": valid,
            "focused": valid,
            "errorList": validationData.errors,
        };
        this.setState({
            fieldFunctionalData: data,
            prevFuncData: [...this.state.prevFuncData, {fieldValue: fieldValue, data: data}],
        })
    }

    setErrors(){
        if ("setErorrs" in this.props == false || "fieldname" in this == false){throw "FieldUtils: Function setErorrs or Field fieldname doesn't exist"}
        if (!this.errors || !this.errors.length){
            this.props.setErorrs(draft=>{
                delete draft[this.fieldname]
            })
            return
        }
        this.props.setErorrs(draft=>{
            draft[this.fieldname] = this.errors
        })
    }

    getTextFieldAttributs(){
        return{
            ...super.getTextFieldAttributs(),
            fullWidth: "fullWidth" in this.props ? this.props.fullWidth : true,
            sx: this.style, 
            error: this.state.fieldFunctionalData.error, 
            focused: this.state.fieldFunctionalData.focused,
            onFocus: this.handleFocus,
            color: this.state.fieldFunctionalData.success? "success":"primary", 
        }
    }
    componentWillUnmount(){

    }
}