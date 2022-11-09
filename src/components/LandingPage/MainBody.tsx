import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import HeadingAndSubheading from "./HeadingAndSubheading";
import RentAndLendDisplay from "./RentAndLendDisplay";
import FeaturedNFT from "./FeaturedNFT";

const MainBody: React.FC = () => {
  return (
    <>
      <HeadingAndSubheading
        title="How it works"
        subtitle="NFT’s Hangout allows any metaverse or marketplace to generate new revenue streams, reimagine user experiences, and empower communities."
      />
      <Box sx={{ marginTop: "8rem", display: "flex", justifyContent: "space-evenly" }}>
        <RentAndLendDisplay title="Rent" subtitle="Borrow NFTs to access unique experiences" />
        <StyledDivider />
        <RentAndLendDisplay title="Lend" subtitle="Lend your NFTs and earn passive income" />
      </Box>
      <div style={{ marginTop: "6rem" }}></div>
      <HeadingAndSubheading
        title="Featured NFT’s"
        subtitle="Let’s find a collectible that is perfect for you."
      />
      <div style={{ margin: "15px" }}></div>
      <FeaturedNFT />
    </>
  );
};

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: "0 4rem",
  backgroundColor: "#E4E4E4",
  border: "1px solid #E4E4E4",
  height: "15rem",
}));

export default MainBody;
