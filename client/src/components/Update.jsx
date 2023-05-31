import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";


//CSS
import "./css/Login.css";

//api
import * as api from "../services/api";

//Validation
import { updateValidation } from "../validation/Update.validation";


export default function Update() {

  const navigate = useNavigate();

  //Display Data OnLoad
  const { register, handleSubmit, formState:{errors} } = useForm({
    defaultValues:async()=>api.getUser(),
    resolver:yupResolver(updateValidation())
  });

  function onSubmit(data) {
    const response = api.updateUser(data);
    toast.promise(response, {
      loading: "Please wait...",
      error: (err)=>err.msg,
      success: (data)=>data.msg
    });
    response.then(data=>{
      navigate("/user")
    }).catch(err=>err)
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-title">
          <span>Edit Your Details</span>
        </div>
        <div className="title-2">
          <span>UPDATE</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="text"
            placeholder="Enter Name"
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

        <button type="submit" className="submit">
          <span className="sign-text">Update Details</span>
        </button>
      </form>
    </div>
  );
}
