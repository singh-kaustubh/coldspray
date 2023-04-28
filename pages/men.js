/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { ItemContext } from "../Context/ItemState";
export default function Men() {
  const context = useContext(ItemContext);
  const { menItem } = context;
  return (
    <div>
      <section className="text-gray-600 body-font min-h-[50vh]">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {menItem != null ? (
              menItem.map((item) => {
                return (
                  <Link
                    passHref={true}
                    href={`/product/${item._id}`}
                    key={item._id}
                  >
                    <div className=" lg:w-1/5 cursor-pointer shadow-lg m-5 md:w-1/2 p-4 w-full">
                      <a className="block relative rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="m-auto md:mx-auto h-[30vh] md:h-[36vh] block"
                          src={item.img}
                        />
                      </a>
                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {item.title.slice(0, 30)}
                        </h3>
                        <h2 className="text-gray-900 title-font text-justify text-lg font-medium">
                          {item.desc.slice(0, 80)}...
                        </h2>
                        <p className="-mt-1">$ {item.price}</p>
                        <div className="flex align-baseline justify-between mt-2">
                          {item.size && (
                            <p className="mt-1 border-2 text-xl">
                              {item.size.map((item) => {
                                return `${item}` + " ";
                              })}
                            </p>
                          )}
                          <div className="flex mt-1">
                            {item._color &&
                              Object.keys(item._color).map((val, index) => {
                                return (
                                  <div key={index}>
                                    {val == "red" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-red-900 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "green" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "yellow" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-yellow rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "blue" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "purple" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-purple rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "cyan" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-cyan-900 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {val == "black" && (
                                      <button className="border-2 border-gray-900 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>No products available! Stay tuned</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
