import {
  Box,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Divider,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { RENT_CARDS } from "../../constants/DefaultData";

import { useContract, useSigner, useProvider } from "wagmi";

import { contractAddress, contractAbi } from "../../constants/contract";
import { Contract } from "ethers";
import { LendedNFTDetails } from "./LendedNFTDetails";
import { ethers } from "ethers"

interface Props {
  currentItemIndex: number;
  open: boolean;
  setOpen(open: boolean): void;
  nftDetails: LendedNFTDetails
}

const MyModal: React.FC<Props> = ({ open, setOpen, currentItemIndex, nftDetails,}) => {
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [txHash, setTxHash] = useState("");

  // Contract
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi,
    signerOrProvider: signer || provider,
  }) as Contract;

  // If signer doesnt exist, show error
  if (!signer) {
    return (
      <>
        <Typography variant="h6">
          Please connect to MetaMask or WalletConnect to continue
        </Typography>
      </>
    );
  }

  const today = Math.trunc(Date.now()/1000);
  const duration = Math.floor((nftDetails.dueDate-today)/(60*60*24));

  const handleClose = () => {
    setOpen(false);
  };

  const handleApproveClicked = async () => {
    if (numberOfDays===0) {
      alert("Can't rent for 0 days");
      return;
    }

    console.log("My address - "+signer.getAddress());
    const payment = nftDetails.collateral.add(nftDetails.dailyRent.mul(numberOfDays));
    console.log(payment);
    const tx = await contract.functions["rentNft"](
      nftDetails.nftKey,
      await signer.getAddress(),
      numberOfDays,
      Math.trunc(Date.now()/1000),
      {value: payment}
    ).then((result)=> {
      console.log(result.hash);
      const { transactionHash } = result.hash;
      setTxHash(transactionHash);
    }).catch((error) => {
      console.log(error.reason);
      alert(error.reason);
    });
  };

  const handleNumberOfDaysChanged = (event: any) => {
    if (event.target.value==="")
      setNumberOfDays(0);
    else
      setNumberOfDays(parseInt(event.target.value));
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  id="transition-modal-title"
                  variant="h3"
                  component="h1"
                >
                  Rent
                </Typography>
                <div style={{ marginTop: "1rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Duration in days(max of 100 days)"
                  variant="standard"
                  onChange={(e) => handleNumberOfDaysChanged(e)}
                />
                <div style={{ marginTop: "3rem" }}></div>
                <Typography variant="body2">
                  {"Days Avaiable .............................."+duration+" days"}
                </Typography>
                <Typography variant="body2">
                  {"Daily Rent Price ..............................."+nftDetails.dailyRent.div(1000000000).toString()+" Gwei"}
                </Typography>
                <Typography variant="body2">
                  {"Collateral ..................................."+nftDetails.collateral.div(1000000000).toString()+" Gwei"}
                </Typography>
                <Typography variant="body2">
                  {"Total Rent ...................................."+nftDetails.dailyRent.div(1000000000).mul(numberOfDays).toString()+" Gwei"}
                </Typography>
                <div style={{ marginTop: "1rem" }}></div>
                <Box marginLeft="-0.75rem" display="flex" flexDirection="row">
                  <Checkbox />
                  <Typography sx={{ margin: "auto 0" }} variant="body2">
                    I agree to the Terms and Conditions
                  </Typography>
                </Box>
                <StyledButton
                  onClick={handleApproveClicked}
                  variant="contained"
                >
                  Approve
                </StyledButton>
              </Box>
              <Box
                width={270}
                marginLeft={30}
                display="flex"
                flexDirection="column"
              >
                <Box>
                  <Card
                    elevation={0}
                    sx={{
                      maxWidth: "fit-content",
                      minHeight: "fit-content",
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: "15rem",
                        width: "15rem",
                      }}
                      component="img"
                      image={nftDetails.nftImageURL}
                      alt={nftDetails.nftName}
                    />
                    <CardContent>
                      <Typography
                        sx={{ paddingLeft: "1rem" }}
                        variant="h5"
                        component="h2"
                      >
                        {nftDetails.nftName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography
                    sx={{ fontWeight: "bold", color: "#6D676E" }}
                    variant="body1"
                  >
                    Token ID
                  </Typography>
                  <Typography variant="body1">{nftDetails.nftId.toString()}</Typography>
                </Box>
                <Divider sx={{ marginBottom: "0.6rem" }} />
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography
                    sx={{ fontWeight: "bold", color: "#6D676E" }}
                    variant="body2"
                  >
                    Address
                  </Typography>
                  <Typography variant="body2">
                    {nftDetails.nftAddress.slice(0, 5) +
                      "......" +
                      nftDetails.nftAddress.slice(-5)}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: "0.6rem" }} />
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography
                    sx={{ fontWeight: "bold", color: "#6D676E" }}
                    variant="body2"
                  >
                    Token Standard
                  </Typography>
                  <Typography variant="body2">ERC721</Typography>
                </Box>
                <Divider sx={{ marginBottom: "0.6rem" }} />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxwidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "2rem",
  color: "white",
  borderRadius: "1.5rem",
  width: "fit-content",
  height: "1rem",
  backgroundColor: "#384D68",
  padding: "12px 15px",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  transition: "all 0.5s ease",
}));
export default MyModal;
