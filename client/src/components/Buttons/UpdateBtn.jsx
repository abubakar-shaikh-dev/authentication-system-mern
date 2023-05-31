import React from "react";
import { Link } from "react-router-dom";

export default function UpdateBtn() {
  return (
    <li>
      <Link to={'/update'}>Edit Profile</Link>
    </li>
  );
}
