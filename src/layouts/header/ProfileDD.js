import React from "react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfileDD() {
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [admin, setAdmin] = useState("");
  const fetchAdmin = async (token) => {
    const response = await fetch(
      "http://localhost:3000/api/admin/fetchAdminUser",
      {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }
    );
    const res = await response.json();
    setAdmin(res.name);
  };
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("admin-token");
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
      router.push("/admin/login");
    }, 1000);
  };
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    fetchAdmin(token);
  }, []);
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box className="space-x-2" display="flex" alignItems="center">
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {admin}
            </Typography>
          </Box>
          <button
            type="button"
            onClick={() => {
              handleLogout();
            }}
            className="flex text-base py-1 px-3 text-white bg-red-900 border-0 focus:outline-none hover:scale-105 rounded"
          >
            Log Out
          </button>
        </Box>
      </Button>
    </>
  );
}
