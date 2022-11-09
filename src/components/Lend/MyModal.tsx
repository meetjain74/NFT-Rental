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
import { LEND_CARDS } from "../../constants/DefaultData";
import { styled } from "@mui/system";
import { useContract, useSigner, useProvider } from "wagmi";
import { contractAddress, contractAbi } from "../../constants/contract";
import { getSignerAddress } from "../../utils";

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
    addressOrName: contractAddress,
    contractInterface: contractAbi.abi,
    signerOrProvider: signer || provider,
  });

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

  const handleClose = () => {
    setOpen(false);
  };

  const handelNumberOfDaysChanged = (event: any) => {
    setNumberOfDays(parseInt(event.target.value));
  };

  const handelCollateralChanged = (event: any) => {
    setCollateral(parseInt(event.target.value));
  };

  const handelDailyPriceChanged = (event: any) => {
    setDailyPrice(parseInt(event.target.value));
  };

  const handelApproveClicked = async () => {
    console.log(numberOfDays);
    console.log(collateral);
    console.log(dailyPrice);

    const nft = userNFTs[currentItemIndex];

    const tx = await contract.functions["addNFTToLend"](
      currentItemIndex,
      /* owner */
      nft.owner,
      /* address */
      nft.token_address,
      /* id */
      nft.token_id,
      /* name */
      nft.name,
      /* image */
      nft.metadata,
      /* lender */
      await getSignerAddress(signer),
      /* due date */
      Date.now() + numberOfDays * 24 * 60 * 60 * 1000,
      /* daily rent */
      dailyPrice,
      /* collateral */
      collateral
    );

    const receipt = await tx.wait();

    const { transactionHash } = receipt;

    setTxHash(transactionHash);

    // Call approve
    const tx2 = await contract.functions["approve"]();

    const receipt2 = await tx2.wait();

    const { transactionHash: txHash2 } = receipt2;

    setTxHash(txHash2);
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
                  onChange={(e) => handelNumberOfDaysChanged(e)}
                />
                <div style={{ marginTop: "1rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Coletral"
                  variant="standard"
                  onChange={(e) => handelCollateralChanged(e)}
                />
                <div style={{ marginTop: "1rem" }}></div>
                <TextField
                  style={{ width: "20rem" }}
                  label="Enter Daily Price"
                  variant="standard"
                  onChange={(e) => handelDailyPriceChanged(e)}
                />
                <div style={{ marginTop: "3rem" }}></div>
                <StyledButton
                  onClick={handelApproveClicked}
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
                      // image={(async () => {
                      //   // @ts-ignore
                      //   return (await storage.get(item.metadata)).image.replace(
                      //     "ipfs://",
                      //     "https://ipfs.io/ipfs/"
                      //   );
                      // })()}
                      alt={item.imageName}
                    />
                    <CardContent>
                      <Typography
                        sx={{ paddingLeft: "1rem" }}
                        variant="h5"
                        component="h2"
                      >
                        {item.name}
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
                  <Typography variant="body1">{item.token_id}</Typography>
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
                    {item.token_address.slice(0, 5) +
                      ".." +
                      item.token_address.slice(-5)}
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
