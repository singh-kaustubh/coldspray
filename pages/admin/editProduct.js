/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
export default function AddProducts({ product }) {
  const router = useRouter();
  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    if (!temp.length) {
      router.push("/admin/login");
    }

    if (product._sizeQty) {
      let sz = [];
      Object.keys(product._sizeQty).forEach((key) => {
        sz.push({ variant: key, qty: product._sizeQty[key] });
      });
      setSizeQty(sz);
    }
    if (product._color) {
      let clr = [];
      Object.keys(product._color).forEach((key) => {
        Object.keys(product._color[key]).forEach((item) => {
          clr.push({ color: key, size: item, qty: product._color[key][item] });
        });
      });
      setColorQty(clr);
    }
    if (product.var_img) {
      let img = [];
      Object.keys(product.var_img).forEach((key) => {
        img.push({ color: key, url: product.var_img[key] });
      });
      setImgQty(img);
    }
  }, []);
  const [colorShow, setColorShow] = useState(product._color ? true : false);
  const [sizeShow, setSizeShow] = useState(product._sizeQty ? true : false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [availQty, setAvailQty] = useState(product.availableQty);
  const [desc, setDesc] = useState(product.desc);
  const [defaultImg, setDefaultImg] = useState(product.img);
  const handleTitlechange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handlePricechange = (e) => {
    const { value } = e.target;
    setPrice(parseInt(value));
  };
  const handleDescchange = (e) => {
    const { value } = e.target;
    setDesc(value);
  };
  const handleDefaultImgchange = (e) => {
    const { value } = e.target;
    setDefaultImg(value);
  };
  const handleAvailQtychange = (e) => {
    const { value } = e.target;
    setAvailQty(value);
  };
  const handleChangeVariants = (e) => {
    if (e.target.name == "color") {
      setColorShow(true);
      setSizeShow(false);
    } else if (e.target.name == "size") {
      setColorShow(false);
      setSizeShow(true);
    } else {
      setColorShow(false);
      setSizeShow(false);
    }
  };
  const [category, setCategory] = useState("");
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const [colorQty, setColorQty] = useState([{ color: "", size: "", qty: 0 }]);
  const handleAddColor = () => {
    setColorQty([...colorQty, { color: "", size: "", qty: 0 }]);
  };
  const handleRemoveColor = (index) => {
    const list = [...colorQty];
    list.splice(index, 1);
    setColorQty(list);
  };
  const handleColorVariant = (e, index) => {
    const { name, value } = e.target;
    const list = [...colorQty];
    let temp;
    if (name == "color") {
      temp = value.toLowerCase();
    } else if (name == "size") {
      temp = value.toUpperCase();
    } else if (name == "qty") {
      temp = parseInt(value);
    }
    list[index][name] = temp;
    setColorQty(list);
  };
  const [sizeQty, setSizeQty] = useState([{ variant: "", qty: 0 }]);
  const handleAddSize = () => {
    setSizeQty([...sizeQty, { variant: "", qty: 0 }]);
  };
  const handleRemoveSize = (index) => {
    const list = [...sizeQty];
    list.splice(index, 1);
    setSizeQty(list);
  };
  const handleSizeVariant = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizeQty];
    let temp;
    if (name == "variant") {
      temp = value.toUpperCase();
    } else if (name == "qty") {
      temp = parseInt(value);
    }
    list[index][name] = temp;
    setSizeQty(list);
  };
  const [imgQty, setImgQty] = useState([{ color: "", url: "" }]);
  const handleAddImg = () => {
    setImgQty([...imgQty, { color: "", url: "" }]);
  };
  const handleRemoveImg = (index) => {
    const list = [...imgQty];
    list.splice(index, 1);
    setImgQty(list);
  };
  const handleImgVariant = (e, index) => {
    const { name, value } = e.target;
    const list = [...imgQty];
    let temp;
    if (name == "color") {
      temp = value.toLowerCase();
    } else if (name == "url") {
      temp = value;
    }
    list[index][name] = temp;
    setImgQty(list);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};
    let size = [];
    let avaqty = 0;
    if (sizeShow) {
      let _sizeQty = {};
      sizeQty &&
        sizeQty.map((item) => {
          size.push(item.variant);
          _sizeQty[item.variant] = parseInt(item.qty);
          avaqty += parseInt(item.qty);
        });
      data.size = size;
      data._sizeQty = _sizeQty;
      setAvailQty(avaqty);
    }
    if (colorShow) {
      let _color = {};
      let var_img = {};
      let avaqty = 0;
      imgQty &&
        imgQty.map((item) => {
          var_img[item.color] = item.url;
        });
      colorQty &&
        colorQty.map((item) => {
          if (!_color[item.color]) {
            _color[item.color] = {};
            _color[item.color][item.size] = item.qty;
            if (size.indexOf(item.size) === -1) {
              size.push(item.size);
            }
            avaqty += parseInt(item.qty);
          } else {
            _color[item.color][item.size] = item.qty;
            if (size.indexOf(item.size) === -1) {
              size.push(item.size);
            }
            avaqty += parseInt(item.qty);
          }
        });
      setAvailQty(avaqty);
      data.size = size;
      data._color = _color;
      data.var_img = var_img;
    }
    data.title = title;
    data.price = price;
    data.slug = product.slug;
    data.category = category;
    data.availableQty = availQty;
    if (desc) {
      data.desc = desc;
    }
    const temp =
      typeof window !== "undefined" && localStorage.getItem("admin-token");
    data.token = temp;
    data.img = defaultImg;
    data.rating = product.rating;
    const res = await fetch("http://localhost:3000/api/admin/editProduct", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.success) {
      toast.success(response.message, {
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
        router.push("/admin/viewProduct");
      }, 2000);
    } else if (!response.success) {
      toast.error(response.error, {
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
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Edit product (edit the details)">
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    id="title"
                    value={title}
                    onChange={(e) => {
                      handleTitlechange(e);
                    }}
                    label="Title"
                    type="text"
                    variant="outlined"
                    autoComplete="off"
                    defaultValue=""
                  />
                  <FormControl className="flex">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={product.category}
                      className="flex"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="men's clothing"
                        onChange={handleChangeCategory}
                        control={<Radio />}
                        label="Men's Clothing"
                      />
                      <FormControlLabel
                        value="women's clothing"
                        onChange={handleChangeCategory}
                        control={<Radio />}
                        label="Women's Clothing"
                      />
                      <FormControlLabel
                        value="electronics"
                        onChange={handleChangeCategory}
                        control={<Radio />}
                        label="Electronics"
                      />
                      <FormControlLabel
                        value="jewelery"
                        onChange={handleChangeCategory}
                        control={<Radio />}
                        label="Jewellery"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    id="price"
                    label="Price"
                    value={price}
                    name="price"
                    onChange={(e) => {
                      handlePricechange(e);
                    }}
                    type="number"
                    variant="outlined"
                    autoComplete="off"
                  />
                  <TextField
                    id="desc"
                    value={desc}
                    label="Description"
                    name="desc"
                    onChange={(e) => {
                      handleDescchange(e);
                    }}
                    multiline
                    rows={4}
                    autoComplete="off"
                  />
                  <div className="flex space-x-2 justify-between">
                    {" "}
                    <TextField
                      className="w-1/2"
                      id="img_default"
                      name="defaultImg"
                      onChange={(e) => {
                        handleDefaultImgchange(e);
                      }}
                      value={defaultImg}
                      label="Default Image"
                      variant="outlined"
                    />{" "}
                    <TextField
                      className="w-1/2"
                      id="availableQty"
                      name="availQty"
                      value={availQty}
                      onChange={(e) => {
                        handleAvailQtychange(e);
                      }}
                      label="Total Available Quantity"
                      variant="outlined"
                    />
                  </div>
                  {category !== "electronics" && (
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Variants
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={
                          product._sizeQty
                            ? "size"
                            : product._color
                            ? "color"
                            : "none"
                        }
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="color"
                          name="color"
                          control={<Radio />}
                          label="Color Variants (inclusive of sizes)"
                          onChange={handleChangeVariants}
                        />
                        {colorShow && (
                          <div>
                            <label
                              htmlFor="varImages"
                              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                            >
                              Variant Colors
                            </label>
                            <div className="block">
                              {colorQty.map((item, index) => (
                                <div
                                  className="flex my-2 justify-between space-x-2"
                                  key={index}
                                >
                                  {index < colorQty.length - 1 ? (
                                    <Button
                                      onClick={(e) => handleAddColor(e, index)}
                                      variant="outlined"
                                      className="invisible"
                                    >
                                      <span className="text-2xl">+</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={(e) => handleAddColor(e, index)}
                                      variant="outlined"
                                      className="visible"
                                    >
                                      <span className="text-2xl">+</span>
                                    </Button>
                                  )}
                                  <TextField
                                    name="color"
                                    type={"text"}
                                    id="color"
                                    onChange={(e) => {
                                      handleColorVariant(e, index);
                                    }}
                                    value={item.color}
                                    className="w-full"
                                    label="Color"
                                    variant="outlined"
                                    required
                                    placeholder="Enter the Color"
                                  />
                                  <TextField
                                    name="size"
                                    type={"text"}
                                    id="size"
                                    onChange={(e) => {
                                      handleColorVariant(e, index);
                                    }}
                                    value={item.size}
                                    className="w-full"
                                    label="Size"
                                    variant="outlined"
                                    required
                                    autoCapitalize="characters"
                                    placeholder="Enter the size variant (M/L/XL....)"
                                  />
                                  <TextField
                                    type={"number"}
                                    className="w-full"
                                    value={item.qty || 0}
                                    name="qty"
                                    required
                                    onChange={(e) => {
                                      handleColorVariant(e, index);
                                    }}
                                    label="Quantity"
                                    variant="outlined"
                                    placeholder="Enter variant's available units"
                                  />
                                  {colorQty.length > 1 ? (
                                    <Button
                                      onClick={() => handleRemoveColor(index)}
                                      variant="outlined"
                                      color="error"
                                    >
                                      <span className="text-2xl">-</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => handleRemoveColor(index)}
                                      variant="outlined"
                                      color="error"
                                      className="invisible"
                                    >
                                      <span className="text-2xl">-</span>
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <label
                              htmlFor="varImages"
                              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                            >
                              Variant Images
                            </label>
                            <div className="block">
                              {imgQty.map((item, index) => (
                                <div
                                  className="flex my-2 justify-between space-x-2"
                                  key={index}
                                >
                                  {index < imgQty.length - 1 ? (
                                    <Button
                                      onClick={(e) => handleAddImg(e, index)}
                                      variant="outlined"
                                      className="invisible"
                                    >
                                      <span className="text-2xl">+</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={(e) => handleAddImg(e, index)}
                                      variant="outlined"
                                      className="visible"
                                    >
                                      <span className="text-2xl">+</span>
                                    </Button>
                                  )}
                                  <TextField
                                    name="color"
                                    type={"text"}
                                    id="color"
                                    onChange={(e) => {
                                      handleImgVariant(e, index);
                                    }}
                                    value={item.color}
                                    className="w-full"
                                    label="Color"
                                    variant="outlined"
                                    required
                                    placeholder="Enter the color"
                                  />
                                  <TextField
                                    type={"text"}
                                    className="w-full"
                                    value={item.url}
                                    name="url"
                                    required
                                    onChange={(e) => {
                                      handleImgVariant(e, index);
                                    }}
                                    label="Link to Image"
                                    variant="outlined"
                                    placeholder="Enter the link"
                                  />
                                  {imgQty.length > 1 ? (
                                    <Button
                                      onClick={() => handleRemoveImg(index)}
                                      variant="outlined"
                                      color="error"
                                    >
                                      <span className="text-2xl">-</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => handleRemoveImg(index)}
                                      variant="outlined"
                                      color="error"
                                      className="invisible"
                                    >
                                      <span className="text-2xl">-</span>
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <FormControlLabel
                          value="size"
                          name="size"
                          control={<Radio />}
                          label="Size Variants"
                          onChange={handleChangeVariants}
                        />
                        {sizeShow && (
                          <div className="block">
                            {sizeQty.map((item, index) => (
                              <div
                                className="flex my-2 justify-between space-x-2"
                                key={index}
                              >
                                {index < sizeQty.length - 1 ? (
                                  <Button
                                    onClick={(e) => handleAddSize(e, index)}
                                    variant="outlined"
                                    className="invisible"
                                  >
                                    <span className="text-2xl">+</span>
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={(e) => handleAddSize(e, index)}
                                    variant="outlined"
                                    className="visible"
                                  >
                                    <span className="text-2xl">+</span>
                                  </Button>
                                )}
                                <TextField
                                  name="variant"
                                  type={"text"}
                                  id="variant"
                                  onChange={(e) => {
                                    handleSizeVariant(e, index);
                                  }}
                                  value={item.variant}
                                  className="w-full"
                                  label="Size Variant"
                                  variant="outlined"
                                  required
                                  placeholder="Enter the size variant (M/L/XL....)"
                                />
                                <TextField
                                  type={"number"}
                                  className="w-full"
                                  value={item.qty || 0}
                                  name="qty"
                                  required
                                  onChange={(e) => {
                                    handleSizeVariant(e, index);
                                  }}
                                  label="Variant available quantity"
                                  variant="outlined"
                                  placeholder="Enter variant's available units"
                                />
                                {sizeQty.length > 1 ? (
                                  <Button
                                    onClick={() => handleRemoveSize(index)}
                                    variant="outlined"
                                    color="error"
                                  >
                                    <span className="text-2xl">-</span>
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleRemoveSize(index)}
                                    variant="outlined"
                                    color="error"
                                    className="invisible"
                                  >
                                    <span className="text-2xl">-</span>
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        <FormControlLabel
                          value="none"
                          name="none"
                          control={<Radio />}
                          label="None"
                          onChange={handleChangeVariants}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Stack>
                <br />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="outlined"
                  mt={2}
                >
                  Submit
                </Button>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}
export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3000/api/getProduct", {
    method: `GET`,
  });
  const data = await response.json();
  const slug = context.query.slug;
  for (let item of data) {
    if (item.slug === slug) {
      let product = item;
      return {
        props: { product },
      };
    }
  }
}
