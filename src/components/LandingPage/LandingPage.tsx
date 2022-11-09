import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import MainBody from "./MainBody";

const LandingPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={imageBackground}>
        <Navbar marginTop={10} />
        <Hero />
      </Box>
      <MainBody />
      <div style={{ margin: "4rem" }}></div>
      <Footer />
    </div>
  );
};

const imageBackground = [
  {
    backgroundImage: `url(${require("../../assets/heroBackground.png")})`,
    width: "100%",
    height: "55rem",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginTop: "-8rem",
    zindex: "-999",
  },
];
export default LandingPage;
