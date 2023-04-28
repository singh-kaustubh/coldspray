/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Orderadmin() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async (temp) => {
    const response = await fetch("http://localhost:3000/api/admin/getUsers", {
      method: `POST`,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: temp }),
    });
    const data = await response.json();
    setUsers(data.users.reverse());
  };
  const router = useRouter();
  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    if (temp.length) {
      fetchUsers(temp);
    } else {
      router.push("/admin/login");
    }
  }, []);
  const handleDelete = async (email) => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    if (confirm("Are you sure?")) {
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteUser",
        {
          method: `DELETE`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token: temp, email: email }),
        }
      );
      const res = await response.json();
      await fetchUsers(temp);
      if (res.success) {
        toast.success(res.message, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
    }
  };
  return (
    <BaseCard title="Registered Users">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                S. No.
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User Details
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Date of Joining
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "200",
                  }}
                >
                  {index + 1}
                </Typography>
              </TableCell>
              <Link href={`/postcheckout?orderId=${user.name}`}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {user._id}
                  </Typography>
                </TableCell>
              </Link>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {user.phone}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.createdAt.slice(8, 10) +
                    `-` +
                    user.createdAt.slice(5, 7) +
                    `-` +
                    user.createdAt.slice(0, 4) +
                    `@` +
                    user.createdAt.slice(11, 16)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={"blue"} className="underline">
                  {user.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(user.email);
                    }}
                    className="flex text-lg px-3 text-white bg-red-900 border-0 focus:outline-none hover:scale-105 rounded"
                  >
                    Delete
                  </button>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
}
