import React, { useEffect, useState } from "react";
import "./css/Login.css";

//api
import * as api from "../services/api"

export default function User() {


  const [user, setUser] = useState({});


  useEffect(() => {
    api.getUser()
      .then((response)=>{
        setUser(response)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
  }, []);

  return (
    
    <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
      <div className="form">
        <div className="form-title">
          <span>Welcome 👋,</span>
        </div>
        <div className="title-user">
          <span>{user.name}</span>
        </div>
        
        <section className="bg-stars">
          <span className="star" />
          <span className="star" />
          <span className="star" />
          <span className="star" />
        </section>
        
        
      </div>
    </div>
  );
}
