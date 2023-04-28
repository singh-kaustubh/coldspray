/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ImProfile } from "react-icons/im";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [npassword, setNpassword] = useState();
  const [cnpassword, setCnpassword] = useState();
  const [show, setShow] = useState(false);
  const [token, setToken] = useState();
  const router = useRouter();
  const toggleCart = () => {
    setShow(!show);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    toast.success(`Successfully logged out!`, {
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
      router.push("/");
    }, 1000);
  };
  const fetchData = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/fetchUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const response = await res.json();
      setName(response.name);
      setEmail(response.email);
      setPhone(response.phone);
      const d = await fetch("http://localhost:3000/api/getUserorders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: response.email }),
      });
      const data = await d.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("auth-token")
        ? localStorage.getItem("auth-token")
        : "";
    if (token.length) {
      setToken(token);
      fetchData(token);
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(parseInt(e.target.value));
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    } else if (e.target.name == "cnpassword") {
      setCnpassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, token, phone, npassword, cnpassword, password };
    try {
      const response = await fetch(`http://localhost:3000/api/updateUser`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(
          `Successfully updated the information for ${name}, Kindly login again to see the changes`,
          {
            theme: "dark",
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
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
    } catch (error) {
      toast.error(`Error updating the information for ${name}`, {
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
    <main className="profile-page min-h-[50vh]">
      {show && (
        <div>
          <div
            className="py-24 bg-gray-200 h-full bg-opacity-70 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="relative py-8 px-5 md:px-10 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                <div className="w-full text-gray-600 mb-3">
                  <ImProfile className="text-3xl mx-auto text-white" />
                </div>
                <form onSubmit={handleSubmit}>
                  <h1 className="text-gray-800 dark:text-white text-center  font-lg font-bold tracking-normal leading-tight mb-4">
                    Enter Personal Information
                  </h1>
                  <label
                    htmlFor="name"
                    className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={name}
                    className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  />
                  <label
                    htmlFor="email"
                    className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                  >
                    E-mail address (non-mutable)
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  />
                  <label
                    htmlFor="phone"
                    className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    onChange={handleChange}
                    name="phone"
                    value={phone}
                    className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  />
                  <div className="flex justify-between space-x-1">
                    <div className="w-1/2">
                      <label
                        htmlFor="npassword"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        New Password (optional)
                      </label>
                      <input
                        id="npassword"
                        type="password"
                        onChange={handleChange}
                        name="npassword"
                        value={npassword}
                        className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="cnpassword"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        Confirm New Password
                      </label>
                      <input
                        id="cnpassword"
                        type="password"
                        onChange={handleChange}
                        name="cnpassword"
                        value={cnpassword}
                        className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="cnpassword"
                    className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                  >
                    Current Password *
                  </label>
                  <input
                    required
                    id="password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder=" "
                    value={password}
                    className="mb-5 mt-2 text-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  />
                  <div className="flex items-center space-x-1 justify-start w-full">
                    <button
                      type="submit"
                      className="bg-red-800 hover:scale-105 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    >
                      Submit
                    </button>
                    <button
                      className="bg-gray-100 hover:scale-105 uppercase text-black font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      onClick={toggleCart}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <button
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onClick={toggleCart}
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="relative block" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={"/images/profile.jpg"}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                </div>
                <div className="flex w-full lg:w-4/12 px-4 justify-center lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 space-x-1 mt-32 sm:mt-0">
                    <button
                      className="bg-red-800 hover:scale-105 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      onClick={toggleCart}
                      style={{ transition: "all .15s ease" }}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="bg-red-800 hover:scale-105 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      onClick={handleLogout}
                      style={{ transition: "all .15s ease" }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg text-gray-500 block tracking-wide">
                        {orders.length} {orders.length > 1 ? "Orders" : "Order"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                  {name}
                </h3>
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-4 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                  <div className="relative flex-grow w-full">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly={true}
                      className="w-full text-center bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative flex-grow w-full">
                    <label
                      htmlFor="number"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      value={phone}
                      readOnly={true}
                      className="w-full text-center bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="flex flex-col w-full">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full border text-2xl">
                            <thead className="bg-gray-800 border-b">
                              <tr>
                                <th
                                  scope="col"
                                  className="font-medium text-white px-6 py-4 text-2xl"
                                >
                                  #OrderID
                                </th>
                                <th
                                  scope="col"
                                  className="text-2xl font-medium text-white px-6 py-4 "
                                >
                                  Items
                                </th>
                                <th
                                  scope="col"
                                  className="text-2xl font-medium text-white px-6 py-4 "
                                >
                                  Amount
                                </th>
                                <th
                                  scope="col"
                                  className="text-2xl font-medium text-white px-6 py-4 "
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="text-2xl font-medium text-white px-6 py-4 "
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((item, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                  >
                                    <Link
                                      href={`/postcheckout?orderId=${item.orderId}`}
                                    >
                                      <td className=" cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 underline">
                                        {item.orderId}
                                      </td>
                                    </Link>
                                    <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.productInfo.map((obj) => {
                                        return `${obj.title.slice(0, 15)}...`;
                                      })}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      ${item.amount}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.createdAt.slice(0, 10)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.status}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
