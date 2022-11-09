import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
}
const RentAndLendDisplay: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", alignItems: "center", color: "#384D68", fontWeight: "normal" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginTop: "1rem",
          marginBottom: "2rem",
          color: "#757575",
          alignItems: "center",
          textAlign: "center",
          lineHeight: "1.3",
          fontWeight: "normal",
        }}
      >
        {subtitle}
      </Typography>
      {title === "Rent" ? (
        <Link to={"/rent"} style={{ textDecoration: "none", margin: "0 auto" }}>
          <StyledButton variant="outlined">Try it out</StyledButton>
        </Link>
      ) : (
        <Link to={"/lend"} style={{ textDecoration: "none", margin: "0 auto" }}>
          <StyledButton variant="outlined">Try it out</StyledButton>
        </Link>
      )}
    </Box>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "1rem",
  marginRight: "3.25rem",
  color: "#000",
  borderRadius: "1.25rem",
  width: "fit-content",
  height: "2.5rem",
  border: "3px solid #D9136B",
  padding: "6px 20px",
  textDecoration: "none",
  textTransform: "none",
  fontSize: "1.5rem",
  fontWeight: "normal",
  transition: "all 0.5s ease",
  margin: "0 auto",
  "&:hover": {
    border: "3px solid #D9136B",
    backgroundColor: "#D9136B",
    color: "#fff",
  },
}));

export default RentAndLendDisplay;
