/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  let sectionStyle = {
    height: "100%",
    backgroundImage: `url(${"/images/register.png"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const response = await res.json();
      if (response.success) {
        localStorage.setItem("auth-token", response.token);
        toast.success(`Successfully signed in ${response.name} `, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push("http://localhost:3000");
        }, 1000);
      } else {
        toast.error(`${response.error}`, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`Internal server error!`, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setEmail("");
    setPassword("");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangehandle = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <section
      className="py-24 bg-gray-900 w-full h-full min-h-screen"
      style={sectionStyle}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-5/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-4">
                <div className="text-center">
                  <img
                    className="mx-auto w-48 -my-4"
                    src={"images/logo.png"}
                    alt="logo"
                  />
                  <Link href={"/"}>
                    <h4 className="text-xl cursor-pointer font-semibold mt-1 mb-8 pb-1">
                      CodeSeven.com
                    </h4>
                  </Link>
                </div>
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <a
                    href={"https://github.com/login"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <button
                      className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={"/images/github.svg"}
                      />
                      Github
                    </button>
                  </a>
                  <a
                    href={
                      "https://accounts.google.com/signin/v2/identifier?service=mail&passive=1209600&osid=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <button
                      className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={"/images/google.svg"}
                      />
                      Google
                    </button>
                  </a>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      autoComplete="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      onChange={onChangehandle}
                      required
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="password"
                      value={password}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      onChange={onChangehandle}
                      style={{ transition: "all .15s ease" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-between flex-wrap mt-6">
              <Link href="/forget" className="text-white">
                <span className="text-white cursor-pointer">
                  Forget password
                </span>
              </Link>
              <Link href="/admin/login" className="text-white">
                <span className="text-white cursor-pointer">Admin Login</span>
              </Link>
              <Link href="/signup" className="text-white">
                <span className="text-white cursor-pointer">
                  Create new account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
