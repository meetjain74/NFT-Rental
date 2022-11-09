import React from "react";
import { Link } from "react-router-dom";

import { Box, List, ListItem, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useConnect } from "wagmi";

interface Props {
  marginTop: number;
}

const Navbar: React.FC<Props> = ({ marginTop }) => {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <StyledLogo variant="h5" style={{ marginTop: `${marginTop}rem` }}>
          NFT's Hangouts
        </StyledLogo>
      </Link>
      <StyledList style={{ marginTop: `${marginTop - 0.25}rem` }}>
        <Link to={"/rent"} style={{ textDecoration: "none" }}>
          <StyledListItems>Rent</StyledListItems>
        </Link>
        <Link to={"/lend"} style={{ textDecoration: "none" }}>
          <StyledListItems>lend</StyledListItems>
        </Link>
        {/* <Link to={"/wishlist"} style={{ textDecoration: "none" }}>
          <StyledListItems>Wishlist</StyledListItems>
        </Link> */}
        <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
          <StyledListItems>Dashboard</StyledListItems>
        </Link>
      </StyledList>

      {activeConnector ? (
        <div>Connected to {activeConnector.name}</div>
      ) : (
        <>
          {connectors.map((x) => (
            <StyledButton
              disabled={!x.ready}
              key={x.id}
              onClick={() => connect(x)}
              style={{ marginTop: `${marginTop}rem` }}
              variant="outlined"
            >
              {x.name}
              {isConnecting && pendingConnector?.id === x.id && " (connecting)"}
            </StyledButton>
          ))}
        </>
      )}
    </Box>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "3.25rem",
  color: "white",
  borderRadius: "1.25rem",
  width: "fit-content",
  height: "36px",
  border: "3px solid #D9136B",
  padding: "6px 20px",
  textDecoration: "none",
  transition: "all 0.5s ease",
  "&:hover": {
    border: "3px solid #D9136B",
    backgroundColor: "#D9136B",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  marginTop: "-2rem",
  display: "flex",
  justifyContent: "space-evenly",
  color: "white",
  fontWeight: "1rem",
  fontSize: "1.25rem",
}));

const StyledListItems = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  color: "white",
  transition: "all 0.5s ease",
  "&:hover": {
    underline: "1px solid #D9136B",
    color: "#D9136B",
  },
}));

const StyledLogo = styled(Typography)(({ theme }) => ({
  marginLeft: "50px",
  color: "#FBFFFE",
  cursor: "pointer",
  fontSize: "2rem",
}));

export default Navbar;
