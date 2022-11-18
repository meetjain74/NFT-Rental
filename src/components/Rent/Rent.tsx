import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";

import { contractAddress, contractAbi } from "../../constants/contract";
import Navbar from "../Navbar/Navbar";
import MyModal from "./MyModal";
import Footer from "../LandingPage/Footer";
import { Contract } from "ethers";
import { LendedNFTDetails } from "./LendedNFTDetails";

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

const FetchLendNftDetails = async(element: string,contract: any) => {
  let lendNft = new LendedNFTDetails();
  const receipt = await contract.functions["nftKeyToNftProps"](element);
  lendNft.nftKey= await receipt.nftKey;
  lendNft.nftOwner=await receipt.nftOwner;
  lendNft.nftAddress=await receipt.nftAddress;
  lendNft.nftId=await receipt.nftId;
  lendNft.nftName=await receipt.nftName;
  lendNft.nftImageURL=await receipt.nftImageURL;

  const _receipt = await contract.functions["nftKeyToLendedNftDetails"](element);
  lendNft.lenderAddress=await _receipt.lenderAddress;
  lendNft.borrowerAddress=await _receipt.borrowerAddress;
  lendNft.dueDate=await _receipt.dueDate;
  lendNft.dailyRent=await _receipt.dailyRent;
  lendNft.collateral=await _receipt.collateral;

  await console.log(lendNft);
  return await lendNft;
}

const FetchNfts = async(contract:any) => {
  const keys = await contract.functions["getNftKeysListAvaiableForRent"]();
  await console.log(keys);
  let availableNFTs = new Array<LendedNFTDetails>();
  Promise.all(keys.map((element:any) => {
    console.log(element[0]);
    const lendNft = callAsync(
      () => FetchLendNftDetails(element[0],contract)
    );
    lendNft.then((_receipt:any) => {
      availableNFTs.push(_receipt);
    })
  })).then(() => {
    console.log("All nft details fetched- ")
    console.log(availableNFTs);
  })

  return await availableNFTs;
}

const Rent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const handleRentNowClicked = (index: number) => {
    setOpenModal(true);
    setCurrentItemIndex(index);
  };

  // Contract
  const { data: signer } = useSigner();
  const provider = useProvider();

  const { address } = useAccount();

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi,
    signerOrProvider: signer || provider,
  }) as Contract;

  // Get all NFTs available for rent
  const [nftsData, setNftsData] = useState<any[]>([]);

  useEffect(() => {
    FetchNfts(contract).then((nfts)=>{
      console.log(nfts);
      setTimeout(function(){
        setNftsData(nfts);
      }, 3000);
      console.log(nftsData);
    });
  },[address]);

  return (
    <>
      <Box sx={imageBackground}>
        <Navbar marginTop={1} />
      </Box>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">NFT's Marketplace</Typography>
      </div>
      <div style={{ marginTop: "2rem" }}></div>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {nftsData.map((item: any,index: number) => {
          return (
            <Grid
              sx={{ alignItems: "center", justifyContent: "center" }}
              item
              key={index}
            >
              <Card
                sx={{ maxWidth: 345, minHeight: 500, margin: "1rem 1.5rem" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex" }}>
                    <CardMedia
                      sx={{
                        height: "200px",
                        width: "200px",
                        flex: "1",
                      }}
                      component="img"
                      image={item.nftImageURL}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <TextField
                          id="standard-read-only-input"
                          label="Name"
                          defaultValue={item.nftName}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard"
                        />
                        <TextField
                          sx={{ marginTop: "0.5rem" }}
                          id="standard-read-only-input"
                          label="Token ID"
                          defaultValue={item.nftId}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard"
                        />
                        <TextField
                          sx={{ marginTop: "0.5rem" }}
                          id="standard-read-only-input"
                          label="Token Address"
                          defaultValue={item.nftAddress.slice(0,5)+"...." +item.nftAddress.slice(-5)}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard"
                        />
                      </CardContent>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#6D676E" }}
                          variant="body1"
                        >
                          NFT Owner
                        </Typography>
                        <Typography variant="body1">
                          {item.nftOwner.slice(0,5)+"......" +item.nftOwner.slice(-5)}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider
                      sx={{
                        alignSelf: "center",
                        width: "20rem",
                        marginTop: "-1rem",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#6D676E" }}
                          variant="body1"
                        >
                          Daily Rent
                        </Typography>
                        <Typography variant="body1">
                          {item.dailyRent.toString()}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider
                      sx={{
                        alignSelf: "center",
                        width: "20rem",
                        marginTop: "-1rem",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#6D676E" }}
                          variant="body1"
                        >
                          Collateral
                        </Typography>
                        <Typography variant="body1">
                          {item.collateral.toString()}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider
                      sx={{
                        alignSelf: "center",
                        width: "20rem",
                        marginTop: "-1rem",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#6D676E" }}
                          variant="body1"
                        >
                          Maximum Duration (Days)
                        </Typography>
                        <Typography variant="body1">
                          {item.dueDate}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider
                      sx={{
                        alignSelf: "center",
                        width: "20rem",
                        marginTop: "-1rem",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#6D676E" }}
                          variant="body1"
                        >
                          Standard
                        </Typography>
                        <Typography variant="body1">ERC721</Typography>
                      </Box>
                    </CardContent>
                    <Divider
                      sx={{
                        alignSelf: "center",
                        width: "20rem",
                        marginTop: "-1rem",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ marginTop: "2rem" }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        <StyledMoreDetailsButton variant="text">
                          More Details
                        </StyledMoreDetailsButton>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.4375 6.25H7.8125C7.72962 6.25 7.65013 6.28292 7.59153 6.34153C7.53292 6.40013 7.5 6.47962 7.5 6.5625V8.75H1.25V2.5H4.0625C4.14538 2.5 4.22487 2.46708 4.28347 2.40847C4.34208 2.34987 4.375 2.27038 4.375 2.1875V1.5625C4.375 1.47962 4.34208 1.40013 4.28347 1.34153C4.22487 1.28292 4.14538 1.25 4.0625 1.25H0.9375C0.68886 1.25 0.450403 1.34877 0.274587 1.52459C0.098772 1.7004 0 1.93886 0 2.1875L0 9.0625C0 9.31114 0.098772 9.5496 0.274587 9.72541C0.450403 9.90123 0.68886 10 0.9375 10H7.8125C8.06114 10 8.2996 9.90123 8.47541 9.72541C8.65123 9.5496 8.75 9.31114 8.75 9.0625V6.5625C8.75 6.47962 8.71708 6.40013 8.65847 6.34153C8.59987 6.28292 8.52038 6.25 8.4375 6.25ZM9.53125 0H7.03125C6.61387 0 6.40527 0.506055 6.69922 0.800781L7.39707 1.49863L2.63672 6.25723C2.59302 6.30077 2.55835 6.35252 2.53469 6.4095C2.51103 6.46648 2.49885 6.52756 2.49885 6.58926C2.49885 6.65095 2.51103 6.71204 2.53469 6.76902C2.55835 6.82599 2.59302 6.87774 2.63672 6.92129L3.07949 7.36328C3.12304 7.40698 3.17479 7.44165 3.23176 7.46531C3.28874 7.48897 3.34983 7.50115 3.41152 7.50115C3.47322 7.50115 3.5343 7.48897 3.59128 7.46531C3.64826 7.44165 3.70001 7.40698 3.74355 7.36328L8.50156 2.60391L9.19922 3.30078C9.49219 3.59375 10 3.38867 10 2.96875V0.46875C10 0.34443 9.95061 0.225201 9.86271 0.137294C9.7748 0.049386 9.65557 0 9.53125 0V0Z"
                            fill="#6D676E"
                          />
                        </svg>
                      </div>
                      <StyledRentButton
                        onClick={() => handleRentNowClicked(index)}
                        style={{ marginTop: "-0.2rem" }}
                      >
                        <Typography variant="h6">Rent Now</Typography>
                      </StyledRentButton>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Footer />
      {openModal && nftsData && <MyModal
        currentItemIndex={currentItemIndex}
        open={openModal}
        setOpen={setOpenModal}
      />}
    </>
  );
};

const StyledRentButton = styled(Button)(({ theme }) => ({
  transition: "all 0.5s ease",
  color: "#D9136B",
  "&:hover": {
    color: "#1053b8",
  },
}));
const StyledMoreDetailsButton = styled(Button)(({ theme }) => ({
  color: "#6D676E",
  transition: "all 0.5s ease",
  "&:hover": {
    color: "#D9136B",
    backgroundColor: "transparent",
  },
}));

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

export default Rent;
