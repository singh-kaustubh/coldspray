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
import { AiOutlineCheckCircle } from "react-icons/ai";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Orderadmin() {
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
  const handleEdit = async (slug) => {
    router.push(`/admin/editProduct?slug=${slug}`);
  };
  const handleDelete = async (slug) => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    if (confirm("Are you sure?")) {
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteProduct",
        {
          method: `DELETE`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token: temp, slug: slug }),
        }
      );
      const res = await response.json();
      await fetchProducts(temp);
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
                Date of Updation
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Variants
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
                <Typography color="textSecondary" variant="h6">
                  {product.updatedAt.slice(8, 10) +
                    `-` +
                    product.updatedAt.slice(5, 7) +
                    `-` +
                    product.updatedAt.slice(0, 4)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">${product.price}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {product.size.length ? (
                        <span className="flex">
                          Size:
                          <AiOutlineCheckCircle className="text-xl mx-auto" />
                        </span>
                      ) : (
                        " "
                      )}
                    </Typography>
                    <Typography variant="h6">
                      {product._color ? (
                        <span className="flex">
                          Color:
                          <AiOutlineCheckCircle className="text-xl mx-auto" />
                        </span>
                      ) : (
                        " "
                      )}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(product.slug);
                    }}
                    className="flex text-lg justify-center my-1 w-full text-white bg-red-900 border-0 focus:outline-none hover:scale-105 rounded"
                  >
                    Edit
                  </button>
                </Typography>
                <Typography variant="h6">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(product.slug);
                    }}
                    className="flex text-lg justify-center my-1 w-full text-white bg-red-900 border-0 focus:outline-none hover:scale-105 rounded"
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

