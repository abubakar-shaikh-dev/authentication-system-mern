import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LogoutBtn from "./Buttons/LogoutBtn";
import UpdateBtn from "./Buttons/UpdateBtn";
import { useSelector } from 'react-redux';

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <>
      <Toaster />
      <div className="navbar bg-transparent bg-base-100 shadow-md">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost font-mono text-white normal-case text-xl"
          >
            AUTH V1
          </Link>
        </div>

          {isLoggedIn && (<div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="src/assets/images/user.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <UpdateBtn />
                <LogoutBtn />
              </ul>
            </div>
          </div>)}
          
        
      </div>
      <Outlet />
    </>
  );
}
