import React from "react";
import { Link } from "react-router-dom";

//CSS
import "./css/Login.css";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
      <div className="form">
        
        
        <p className="signup-link flex gap-8">
          <Link to="/register" className="up">
            Register
          </Link>
          <Link to="/login" className="up">
            Login
          </Link>
        </p>
        
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
