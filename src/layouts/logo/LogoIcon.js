import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/admin" style={{ textDecoration: "none" }}>
      <a className="flex title-font font-medium items-center text-xl text-black md:mb-0 cursor-pointer">
        <Image
          className=""
          src="/images/logo.png"
          width={30}
          height={30}
          alt="..."
        />
        CodeSeven Admin
      </a>
    </Link>
  );
};

export default LogoIcon;
