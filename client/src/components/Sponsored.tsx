import React from "react";
import { assets } from "../assets/assets";

const Sponsored = () => {
  return (
    <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
      <h3 className="text-slate-800 font-semibold">Sponsored</h3>
      <img src={assets.sponsored_img} className="w-75 h-65 rounded-md" alt="" />
      <p className="text-slate-600">Get Tickets Now!</p>
      <p className="text-slate-400">
        Join the Commodores this Saturday against the Virginia Tech Hokies. 9/6,
        6:00 p.m. @ the Lane Stadium!
      </p>
    </div>
  );
};

export default Sponsored;
