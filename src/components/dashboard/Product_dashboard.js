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
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Productadmin() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async (temp) => {
    const response = await fetch(
      "http://localhost:3000/api/admin/getProducts",
      {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token: temp }),
      }
    );
    const data = await response.json();
    setProducts(data.products.reverse());
  };
  const router = useRouter();
  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    if (temp.length) {
      fetchProducts(temp);
    } else {
      router.push("/admin/login");
    }
  }, []);
  return (
    <BaseCard title="Registered Products">
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
                Product ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Product Details
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Quantity in stock
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
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
              <Link href={`/product/${product.slug}`}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "blue",
                    }}
                    className="cursor-pointer"
                  >
                    {product.slug}
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
                      {product.title.slice(0, 20)}...
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  className="text-center"
                  color="textSecondary"
                  variant="h6"
                >
                  {product.availableQty}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
}
