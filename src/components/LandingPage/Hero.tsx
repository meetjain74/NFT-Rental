import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const Hero: React.FC = () => {
  return (
    <>
      <StyledTitle variant="h2">
        Make <span style={{ color: "#D9136B", fontWeight: "bold" }}>NFT's</span> work for you
      </StyledTitle>
      <Typography variant="h6" sx={{ color: "#ACACAC", marginLeft: "50px" }}>
        The best way to rent, lend, and mortgage NFTs.
      </Typography>
      <Box sx={{ display: "flex" }}>
        <StyledButton variant="contained">Get Started</StyledButton>
        <StyledLearnMore variant="text">Learn More |&#8594;</StyledLearnMore>
      </Box>
    </>
  );
};
const StyledLearnMore = styled(Button)(({ theme }) => ({
  marginLeft: "50px",
  fontSize: "1.5rem",
  color: "white",
  textTransform: "capitalize",
  marginTop: "2rem",
  transition: "all 0.5s ease",
  "&:hover": {
    color: "#D9136B",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: "3rem",
  marginTop: "2rem",
  color: "white",
  borderRadius: "1.5rem",
  width: "fit-content",
  height: "3rem",
  backgroundColor: "#D9136B",
  padding: "20px 25px",
  textDecoration: "none",
  fontSize: "1.8rem",
  fontWeight: "500",
  textTransform: "capitalize",
  transition: "all 0.5s ease",
  "&:hover": {
    backgroundColor: "#179bcfb0",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  marginLeft: "50px",
  maxWidth: "500px",
  marginTop: "8rem",
  fontSize: "5rem",
}));

export default Hero;
