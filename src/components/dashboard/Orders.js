import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Orderadmin() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await fetch("http://localhost:3000/api/getOrders", {
      method: `GET`,
    });
    const data = await response.json();
    setOrders(data.reverse());
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleDelete = async (orderId) => {
    if (confirm("Are you sure?")) {
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteOrder",
        {
          method: `DELETE`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ orderId: orderId }),
        }
      );
      const res = await response.json();
      await fetchOrders();
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
        toast.error(`Unable to delete orderID: ${orderId}`, {
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
    <BaseCard title="Recent Orders">
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
                OrderId
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Owner
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Date of Purchase
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Subtotal
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
          {orders.map((product, index) => (
            <TableRow key={product._id}>
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
              <Link href={`/postcheckout?orderId=${product.orderId}`}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "blue",
                    }}
                    className="underline cursor-pointer"
                  >
                    #{product.orderId}
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
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.address.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.createdAt.slice(8, 10) +
                    `-` +
                    product.createdAt.slice(5, 7) +
                    `-` +
                    product.createdAt.slice(0, 4) +
                    `@` +
                    product.createdAt.slice(11, 16)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor:
                      product.status == "Success"
                        ? "blue"
                        : product.status == "Paid"
                        ? "green"
                        : product.status == "Pending"
                        ? "yellow"
                        : "red",
                    color: product.status == "Pending" ? "black" : "white",
                  }}
                  size="small"
                  label={product.status}
                ></Chip>
              </TableCell>
              <TableCell>
                <Typography variant="h6">${product.amount}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(product.orderId);
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
