import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import "../../styles/dashboard.css"
import RentCard from "../Card/RentCard";
import LendCard from "../Card/LendCard";

import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [type, setType] = useState<String>("rent");
  const nftdata = require("../../constants/DefaultData.ts")['LEND_CARDS'];

  return (
    <>
      <Box sx={imageBackground}>
        <Navbar marginTop={1} />
      </Box>

      <div className="dashboard-btn-div">
        <Button className={type==="rent" ? 'active-type':'type-btn'} onClick = {()=>setType("rent")}>Rented</Button>
        <Button className={type==="lend" ? 'active-type':'type-btn'} onClick = {()=>setType("lend")}>Lended</Button>
      </div>

      <Grid
        container
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {
        nftdata.map((item:any, index:number)=>{        
        return type==="rent"?
          <RentCard nftName={item.name}
            nftId={item.tokenId}
            nftAddress={item.tokenAddress}
            imageName={item.imageName}
            nftPrice={item.nftPrice}
            dailyRent={"0.01"}
            collateral={"0.01"}
            maximumDuration={"20"}
            nftImageURL = {"featuredNFT1.png"}
            standard={"ERC721"} />:
          <LendCard nftName={"Liquid Hand 101"}
            nftId={"123456789"}
            nftAddress={"0x0000000000000000000000000000000000000000"}
            imageName={"featuredNFT1.png"}
            nftPrice={"2.36"}
            dailyRent={"0.01"}
            collateral={"0.01"}
            maximumDuration={"20"}
            nftImageURL = {"featuredNFT1.png"}
            standard={"ERC721"} />})
        }
      </Grid>

        
      
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
export default Dashboard;
