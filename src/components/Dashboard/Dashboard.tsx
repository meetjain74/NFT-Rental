import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css"
import RentCard from "../Card/RentCard";
import LendCard from "../Card/LendCard";

import Navbar from "../Navbar/Navbar";

import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { contractAddress, contractAbi } from "../../constants/contract";
import { Contract } from "ethers";

// Call an async function using promise
type PromiseFunction = () => Promise<any>;

const callAsync = (fn: PromiseFunction) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (error) {
        reject(error);
      }
    });
  });
}

const FetchUserRentedNFTs = async(contract:any,address:any) => {
  const user = await contract.functions["addressToUser"](address);
  console.log(user.userRentedNftsList);
}

const Dashboard = () => {
  const [type, setType] = useState<String>("rent");
  const nftsData = require("../../constants/DefaultData.ts")['LEND_CARDS'];

  // Get all NFTs available for rent
  //const [nftsData, setNftsData] = useState<any[]>([]);

  // Contract
  const { data: signer } = useSigner();
  const provider = useProvider();

  const { address } = useAccount();

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi,
    signerOrProvider: signer || provider,
  }) as Contract;

  useEffect(() => {
    // FetchUserRentedNFTs(contract,address).then((nfts)=>{
    //   console.log(nfts);
    //   // setTimeout(function(){
    //   //   setNftsData(nfts);
    //   // }, 3000);
    //   // console.log(nftsData);
    // });
  },[signer]);

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
        nftsData.map((item:any, index:number)=>{        
        return type==="rent"?
          <RentCard nftName={item.name}
            nftId={item.tokenID}
            nftAddress={item.tokenAddress}
            imageName={item.imageName}
            nftOwner={item.nftOwner}
            dailyRent={item.dailyRent}
            collateral={item.collateral}
            maximumDuration={item.maximumDuration}
            nftImageURL = {item.nftImageURL}
            standard={item.standard} />:
          <LendCard nftName={item.name}
            nftId={item.tokenID}
            nftAddress={item.tokenAddress}
            imageName={item.imageName}
            nftOwner={item.nftOwner}
            dailyRent={item.dailyRent}
            collateral={item.collateral}
            maximumDuration={item.maximumDuration}
            nftImageURL = {item.nftImageURL}
            standard={item.standard} />
            })
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
