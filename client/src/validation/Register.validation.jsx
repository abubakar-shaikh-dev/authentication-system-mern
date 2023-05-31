import * as yup from "yup";

export function registerSchema(){
    return yup.object({
        name: yup.string().required("Name is Required!"),
        email: yup.string().email("Enter Valid Email").required("Email is Required!"),
        password: yup.string().min(8,"Password Must be 8 Characters!"),
        confirmPassword: yup.string().oneOf([yup.ref('password')],"Password does not Match!")
    }).required()
}