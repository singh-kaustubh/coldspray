/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ItemContext } from "../Context/ItemState";
export default function Electronics() {
  const context = useContext(ItemContext);
  const { electronicItem } = context;
  return (
    <div>
      <section className="text-gray-600 body-font min-h-[50vh]">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {electronicItem != null ? (
              electronicItem.map((item) => {
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
                        <h3 className="text-gray-500 text-xs  tracking-widest title-font mb-1">
                          {item.title.slice(0, 30)}
                        </h3>
                        <h2 className="text-gray-900 title-font text-justify text-lg font-medium">
                          {item.desc.slice(0, 80)}...
                        </h2>
                        <p className="mt-1">$ {item.price}</p>
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
