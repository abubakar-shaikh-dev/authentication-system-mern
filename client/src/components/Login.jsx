import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as api from "../services/api";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/loginSlice';

//Validation
import { loginValidation } from "../validation/Login.validation";

//CSS
import "./css/Login.css";

export default function Login() {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(loginValidation())
  })

  function onSubmit(data){
    const response = api.loginUser(data);
    toast.promise(response, {
      loading: "Please wait...",
      error: (err)=>err.msg,
      success: (data)=>data.msg
    });
    response.then(data=>{
      const token = data.token;
      localStorage.setItem("token",token)
      dispatch(login());
      navigate("/user")
    }).catch(err=>err)  
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
     
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-title">
          <span>Log in to your</span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <span> </span>
        </div>
          {errors.email&&<p className="validation">{errors.email.message}</p>}
        <section className="bg-stars">
          <span className="star" />
          <span className="star" />
          <span className="star" />
          <span className="star" />
        </section>
        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
        </div>
        {errors.password&&<p className="validation">{errors.password.message}</p>}
        <button type="submit" className="submit">
          <span className="sign-text">Log in</span>
        </button>
        <p className="signup-link">
          Don't Have Account?
          <Link to="/register" className="up">
            Register!
          </Link>
        </p>
      </form>
    </div>
  );
}
