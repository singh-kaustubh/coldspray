/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { ItemContext } from "../Context/ItemState";
import Link from "next/link";
import Countdown from "react-countdown";
export default function Content() {
  const Completionist = () => <span>Deal Expired 😢</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          ⏱️ {hours}:{minutes}:{seconds} !
        </span>
      );
    }
  };
  const context = useContext(ItemContext);
  const { featItems } = context;
  const getTimediff = () => {
    const d = new Date();
    const now = Date.now();
    d.setHours(24, 0, 0, 0);
    const diff = d - now;
    return diff;
  };
  return (
    <section className="text-gray-50 bg-slate-800 body-font mt-1">
      <div
        suppressHydrationWarning={true}
        className="md:flex md:justify-between font-bold font-serif text-4xl pt-8 mx-5"
      >
        Featured Products
        <Countdown date={Date.now() + getTimediff()} renderer={renderer} />
      </div>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {featItems.map((item) => {
            return (
              <Link href={`/product/${item._id}`} key={item._id}>
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
                  key={item._id}
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-top w-full h-full block"
                      src={item.img}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category}
                    </h3>
                    <h2 className="text-white title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">${item.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
