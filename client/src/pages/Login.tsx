import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react"; // for star icons
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background */}
      <img
        src={assets.bgImage}
        alt=""
        className="absolute top-0 left-0 -z-1 w-full h-full object-cover"
      />
      {/* Left-hand side: Description*/}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md: p-10 lg:pl-40">
        <img src={assets.logo} alt="" className="h-12 object-contain" />
        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img src={assets.group_users} alt="" className="h-8 md: h-10" />
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 md:size-4.5 text-transparent fill-amber-500"
                    />
                  ))}
              </div>
              <p>Join 100+ users</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            Where moments become memories
          </h1>
          <p className="text-xl md:text-3xl text-yellow-800 max-w-72 md:max-w-md">
            Connect with your fellow Commodores on VandyGram.
          </p>
        </div>
        <span className="md:h-10"></span>
      </div>
      {/* Right-hand side: Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="inline-block transform -translate-x-14">
          <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
