"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function ProductVariant({ disabled, name, price, checked, onClick }: any) {
  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={` relative  border shadow-lg ${
        checked ? "border-primary" : "border-white"
      } p-4 lg:py-2.5 lg:px-1.5 rounded-lg  w-full h-full flex flex-col items-center justify-between overflow-hidden transition-all duration-200 ${
        disabled ? "opacity-30" : "cursor-pointer"
      }`}
    >
      <p className="tex-xs text-black font-bold text-center">{name}</p>
      <p className="text-xs text-black font-normal">{price.toLocaleString("vi-VN")} đ</p>
      {checked && (
        <FaCheck className="absolute top-0 right-0 bg-primary text-white  rounded-bl-lg w-8 h-4 px-2.5 py-0.5" />
      )}
    </div>
  );
}

export default ProductVariant;
