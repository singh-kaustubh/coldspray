/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Forget({ token }) {
  let sectionStyle = {
    height: "100%",
    backgroundImage: `url(${"/images/signup2.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const authToken =
      typeof window !== `undefined` && localStorage.getItem("auth-token");
    if (authToken) {
      toast.success(`Already logged in`, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/");
    }
  }, []);
  const sendToken = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/forgotPassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, phone: phone }),
    });
    const response = await res.json();
    if (response.success) {
      toast.success(response.message, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.alert(
        `This is a dummy email to copy and navigate to receive the link for password reset: ${response.previewURL}`
      );
    } else {
      toast.error(response.error, {
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
  const resetPassword = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: password,
        cpassword: cpassword,
      }),
    });
    const response = await res.json();
    if (response.success) {
      toast.success(response.message, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } else {
      toast.error(response.error, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/forget");
      }, 4000);
    }
  };
  const handleChange = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
  };
  return (
    <div>
      <section
        className="min-h-[50vh] w-full h-full py-24"
        style={sectionStyle}
      >
        <div className="container h-full">
          <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div className="flex justify-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="h-[200px]"
                  alt="Phone image"
                />
              </div>
              {token ? (
                <form onSubmit={resetPassword}>
                  <h1 className="text-white text-center mb-6 text-xl">
                    Enter the new password!
                  </h1>
                  <div className="mb-6">
                    <input
                      id="password"
                      onChange={handleChange}
                      name="password"
                      type="password"
                      autoComplete="off"
                      value={password}
                      required
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      id="cpassword"
                      name="cpassword"
                      autoComplete="off"
                      onChange={handleChange}
                      value={cpassword}
                      type="password"
                      required
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Reset Password
                  </button>
                </form>
              ) : (
                <form onSubmit={sendToken}>
                  <h1 className="text-white text-center mb-6 text-xl">
                    Enter email address and phone for a link to reset password!
                  </h1>
                  <div className="mb-6">
                    <input
                      id="email"
                      name="email"
                      autoComplete="off"
                      value={email}
                      onChange={handleChange}
                      type="email"
                      required
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      value={phone}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Phone"
                      max={9999999999}
                      min={1000000000}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Reset Password
                  </button>
                </form>
              )}
              <div className="flex justify-center flex-wrap mt-6">
                <div className="text-center">
                  <Link href="/signup" className="text-white">
                    <span className="text-white cursor-pointer">
                      Create new account
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  const token = context.query.token ? context.query.token : null;
  return {
    props: { token },
  };
}
