import * as yup from 'yup';

export function updateValidation(){
    return yup.object({
        name: yup.string().required("Name Required!"),
        email: yup.string().email("Enter Valid Email!").required("Email Required!")
    }).required()
}