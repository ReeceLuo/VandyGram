import React from "react";
import { assets } from "../assets";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <img
        src={assets}
        alt=""
        className="absolute top-0 left-0 -z-1 w-full h-full object-cover"
      />
    </div>
  );
};

export default Login;
