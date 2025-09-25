import React from "react";
import { FaGoogle } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
   

    try{
   const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      email: email,
      password: password,
    });
    toast.success("Login Successful")
    console.log(response.data);
    localStorage.setItem("token", response.data.token);

    if(response.data.type === "admin"){
    navigate("/admin");
    }else{
      navigate("/");
    }
 

  }catch(e){
    toast.error("Login Failed")
    console.log( e.response.data.message);
  }
}

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1161931/pexels-photo-1161931.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/15"></div>

      <div className="  w-[1130px] h-[680px] grid grid-cols-1 md:grid-cols-2  ">
        {/* Left Side */}
        <div className="  border-15  border-red-50 bg-transparent flex items-center justify-center rounded-tl-3xl rounded-bl-3xl overflow-hidden shadow-red-300 ">
          <div className="w-full h-full flex shadow-md text-gray-200">
            <p className="font-serif  text-md p-4 fixed mx-95">A WISE QUOTE</p>

            <div className="  w-[305px] h-[203px] flex flex-col mt-112 fixed  text-gray-200 font-serif p-5 ">
              <p className="text-5xl mb-1">Get</p>
              <p className="text-5xl mb-1">Everything</p>
              <p className="text-5xl ">You Want</p>
              <p className="text-xs">
                You can get everything you want if you work hard,
              </p>
              <p className="text-xs">
                trust the process,and stick to the plan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className=" flex flex-col items-center justify-center backdrop-blur-md  shadow-xl rounded-tr-3xl rounded-br-3xl overflow-hidden gap-9">
          <div className=" w-[500px] h-[70px] flex  justify-center items-center mb-150 mr-12">
            <img className="w-20 h-20" src={logo} alt="Logo" />
            <p className="text-black text-xs  font-serif">Glow Theory</p>
          </div>

          <div className=" w-[800px] h-[70px] flex flex-col  justify-center items-center mt-125 fixed ">
            <p className="text-black text-3xl   font-serif text-center">
              Wellcome Back
            </p>
            <p className="text-black text-xs  font-serif text-center">
              Enter your email and password to access your account
            </p>
            <form
              onSubmit={handleLogin}
              className="w-full max-w-md space-y-6 mb-98 fixed "
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black  placeholder-gray-400 focus:placeholder-white"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black  placeholder-gray-400 focus:placeholder-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400"
                ></button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-black"
                >
                  Forgot Password
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
              >
                Sign In
              </button>

              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center py-3 rounded-md border border-black font-semibold text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Sign In with Google
              </button>
            </form>

            <div className="text-center my-113 ">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-black font-semibold hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
