import React from "react";

const LoginButton: React.FC = () => {
  return (
    <div
      className="flex flex-row items-center justify-center hover:scale-[104%]
    gap-2 border border-green-400/60 p-2 px-6 rounded-full shadow-lg cursor-pointer 
    transition-all ease-in-out"
    >
      <img src="/assets/login.png" alt="Login" className="h-12 " />

      <p
        className="text-green-700 text-xl font-semibold uppercase
        transition-all ease-in-out"
      >
        LOGIN
      </p>
    </div>
  );
};

export default LoginButton;