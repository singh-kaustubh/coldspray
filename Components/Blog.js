/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Signup() {
  let sectionStyle = {
    height: "100vh",
    backgroundImage: `url(${"/images/signup4.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  let mybackStyle = {
    height: "100%",
    backgroundImage: `url(${"/images/signup.png"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const onChangehandle = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "number") {
      setNumber(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
  };
  const onSubmithandle = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      phone: parseInt(number),
      cpassword: cpassword,
    };
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        localStorage.setItem("auth-token", res.token);
        toast.success(`Successfully registered ${res.name}`, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.error) {
        toast.error(res.error, {
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
      setName("");
      setEmail("");
      setPassword("");
      setNumber("");
      setCpassword("");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error!", {
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
  };
  return (
    <>
      <section className="h-full gradient-form " style={mybackStyle}>
        <div className="container py-24 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-2xl rounded-lg">
                <div className="lg:flex lg:flex-wrap">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <h4 className="text-4xl font-semibold mt-1 mb-12 pb-1">
                          Value Prediction
                        </h4>
                      </div>
                      <form onSubmit={onSubmithandle} autoComplete="off">
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChangehandle}
                            placeholder="Input Temperature"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChangehandle}
                            placeholder="Input Velocity"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="number"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="number"
                            name="number"
                            value={number}
                            onChange={onChangehandle}
                            placeholder="Divergent Length"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="dropdown"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChangehandle}
                            placeholder="Particle type"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="cpassword"
                            name="cpassword"
                            value={cpassword}
                            onChange={onChangehandle}
                            placeholder="Particle Size in µm"
                            required
                          />
                        </div>
                        <div className="text-center pt-1 mb-7 ">
                          <button
                            type="submit"
                            className="inline-block px-6 py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Calculate
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}