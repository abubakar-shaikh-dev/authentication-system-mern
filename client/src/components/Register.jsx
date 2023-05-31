import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from 'react-hot-toast';

//api
import * as api from "../services/api"

//Validation
import { registerSchema } from "../validation/Register.validation";

//CSS
import "./css/Login.css";

export default function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema()),
  });

  function onSubmit(data){
    const response = api.registerUser(data)
    toast.promise(response, {
      loading: "Please wait...",
      success: (data)=>data,
      error: (err)=>err.msg
    });
    
    response.then(function(){navigate("/login")}).catch(err=>err)
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
    
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-title">
          <span>Make Your Own</span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="text"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          <span> </span>
        </div>
        {errors.name&&<p className="validation">{errors.name.message}</p>}
        

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
        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword&&<p className="validation">{errors.confirmPassword.message}</p>}
        <button type="submit" className="submit">
          <span className="sign-text">Register</span>
        </button>
        <p className="signup-link">
          Already Have Account?
          <Link to="/login" className="up">
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
}
