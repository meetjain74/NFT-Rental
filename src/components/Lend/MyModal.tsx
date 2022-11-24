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
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { useContract, useSigner, useProvider } from "wagmi";
import { contractAddress, contractAbi, ERC721ABI } from "../../constants/contract";
import { getSignerAddress } from "../../utils";
import { Contract,ethers } from "ethers";
import defaultNft from "../../constants/defaultNft.jpg";

interface Props {
  currentItemIndex: number;
  open: boolean;
  setOpen(open: boolean): void;
  userNFTs: any[];
}

const MyModal: React.FC<Props> = ({
  open,
  setOpen,
  currentItemIndex,
  userNFTs,
}) => {
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [dailyPrice, setDailyPrice] = useState(0);

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
          <p>Please connect to MetaMask or WalletConnect to continue</p>
        </Typography>
      </>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleNumberOfDaysChanged = (event: any) => {
    setNumberOfDays(parseInt(event.target.value));
  };

  const handleCollateralChanged = (event: any) => {
    setCollateral(parseInt(event.target.value));
  };

  const handleDailyPriceChanged = (event: any) => {
    setDailyPrice(parseInt(event.target.value));
  };

  const handleApproveClicked = async () => {
    console.log(numberOfDays);
    console.log(collateral);
    console.log(dailyPrice);

    const today = Math.trunc(Date.now()/1000);
    const dueDate = today + numberOfDays*24*60*60;
    console.log(today);
    console.log(dueDate);

    const nft = userNFTs[currentItemIndex];

    const nftAddress = nft.contract.address;
    const nftId = nft.tokenId;
    const nftKey = nftAddress+nftId;
    const nftName = nft.rawMetadata.name;
    const nftURL = "https://gateway.ipfscdn.io/ipfs/"+(nft.rawMetadata.image).slice(5);
    console.log(nftKey);

    const nftOwner = signer?.getAddress();
    console.log(nftOwner);

    // Approve contract address first 
    const nftContract = new ethers.Contract(nftAddress,ERC721ABI,signer);
    const approveTx = await nftContract.approve(contractAddress,nftId);
    await approveTx.wait();
    await console.log(nftContract.getApproved(nftId));

    // Add nft to lend
    const tx = await contract.functions["addNFTToLend"](
      nftKey,
      nftOwner,
      nftAddress,
      nftId,
      nftName,
      nftURL,
      nftOwner,
      dueDate,
      dailyPrice,
      collateral
    );

    const receipt = await tx.wait();
    const { transactionHash } = receipt;
    console.log(transactionHash);
  };

  const item = userNFTs[currentItemIndex];

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
                  Lend
                </Typography>
                <div style={{ marginTop: "3rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Duration in days(max of 100 days)"
                  variant="standard"
                  onChange={(e) => handleNumberOfDaysChanged(e)}
                />
                <div style={{ marginTop: "1rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Collateral(in wei)"
                  variant="standard"
                  onChange={(e) => handleCollateralChanged(e)}
                />
                <div style={{ marginTop: "1rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Daily Price(in wei)"
                  variant="standard"
                  onChange={(e) => handleDailyPriceChanged(e)}
                />
                <div style={{ marginTop: "3rem" }}></div>
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
                      image={item.rawMetadata.image!=undefined ? "https://gateway.ipfscdn.io/ipfs/"+(item.rawMetadata.image).slice(5) : defaultNft}
                      alt={item.contract.name}
                    />
                    <CardContent>
                      <Typography
                        sx={{ paddingLeft: "1rem" }}
                        variant="h5"
                        component="h2"
                      >
                        {item.rawMetadata.name}
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
                  <Typography variant="body1">{item.tokenId}</Typography>
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
                    {item.contract.address.slice(0, 5) +
                      ".." +
                      item.contract.address.slice(-5)}
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
                  <Typography variant="body2">{item.tokenType}</Typography>
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
