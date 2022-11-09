import React from "react";
import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/material";

const Wishlist = () => {
  return (
    <>
      <Box sx={imageBackground}>
        <Navbar marginTop={1} />
      </Box>
    </>
  );
};

const imageBackground = [
  {
    backgroundImage: `url(${require("../../assets/heroBackground.png")})`,
    width: "100%",
    height: "auto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zindex: "-999",
  },
];
export default Wishlist;
