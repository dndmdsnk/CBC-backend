import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      toast.success("Account created successfully!");
      //console.log(response.data);
      navigate("/login"); // redirect to login after successful register
    } catch (e) {
      toast.error("Registration Failed");
      console.log(e.response?.data?.message || e.message);
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover  bg-no-repeat bg-[center_-110px]"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/716437/pexels-photo-716437.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/15"></div>

      <div className="w-[1130px] h-[680px] grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="border-15 border-red-50 bg-transparent flex items-center justify-center rounded-tl-3xl rounded-bl-3xl overflow-hidden shadow-red-300">
          <div className="w-full h-full flex shadow-md text-gray-200">
            <p className="font-serif text-md p-4 fixed mx-95">A WISE QUOTE</p>

            <div className="w-[305px] h-[203px] flex flex-col mt-112 fixed text-gray-200 font-serif p-5">
              <p className="text-5xl mb-1">Join</p>
              <p className="text-5xl mb-1">Our</p>
              <p className="text-5xl">Community</p>
              <p className="text-xs">
                Create your account to explore, connect,
              </p>
              <p className="text-xs">and enjoy amazing features with us.</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center backdrop-blur-md shadow-xl rounded-tr-3xl rounded-br-3xl overflow-hidden gap-9">
          <div className="w-[500px] h-[70px] flex justify-center items-center mb-150 mr-12">
            <img className="w-20 h-20" src={logo} alt="Logo" />
            <p className="text-black text-xs font-serif">Glow Theory</p>
          </div>

          <div className="w-[800px] h-[70px] flex flex-col justify-center items-center mt-120 fixed">
            <p className="text-black text-3xl font-serif text-center mb-16 ">
              Create Account
            </p>
            

            <form
              onSubmit={handleRegister}
              className="w-full max-w-md space-y-6 mb-98 fixed"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-400 focus:placeholder-white"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    id="lastName"
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-400 focus:placeholder-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-400 focus:placeholder-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-400 focus:placeholder-white"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-400 focus:placeholder-white"
                  placeholder="Re-enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
              >
                Sign Up
              </button>

              <div className="relative flex items-center my-1">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center py-3 rounded-md border border-black font-semibold text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Sign Up with Google
              </button>
            </form>

            <div className="text-center my-103 mt-121">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-black font-semibold hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
