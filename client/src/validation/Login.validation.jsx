import * as yup from 'yup';

export function loginValidation(){
    return yup.object({
        email: yup.string().email("Enter Valid Email!").required("Email Required!"),
        password: yup.string().required("Password is Required")
    }).required()
}