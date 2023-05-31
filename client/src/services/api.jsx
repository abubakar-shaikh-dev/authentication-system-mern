import axios from "axios";

const URL = "https://authentication-system-mern.vercel.app/api"

export async function registerUser(data){
    try {
        const response = await axios.post(`${URL}/register`,data)
        return Promise.resolve(response.data.msg)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}

export async function loginUser(data){
    try {
        const response = await axios.post(`${URL}/login`,data);
        return Promise.resolve({
            msg:response.data.msg,
            token:response.data.token
        })
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}

export async function getUser(){
    
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}/user`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data.user);
        return response.data.user
        
    } catch (error) {
        return console.log(error.message)
    }
}

export async function updateUser(data){
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${URL}/update`,data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return Promise.resolve(response.data)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}

export async function logoutUser(){
    try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`${URL}/logout`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(data.status != 1){
            return Promise.reject({msg:data.msg})
        }else{
            return Promise.resolve(data.msg)
        }
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}
