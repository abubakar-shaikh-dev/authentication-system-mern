import React from "react";
import * as api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/loginSlice';

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <li>
      <a
        onClick={() => {
          const response = api.logoutUser();

          toast.promise(response, {
            loading: "Please wait...",
            error: (err) => err.msg,
            success: (data) => data,
          });

          response
            .then((data) => {
              // console.log(data);
              localStorage.removeItem("token");
              dispatch(logout());
              navigate("/");
            })
            .catch((err) => err);
        }}
      >
        Logout
      </a>
    </li>
  );
}
