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

interface Props {
  currentItemIndex: number;
  open: boolean;
  setOpen(open: boolean): void;
}

const MyModal: React.FC<Props> = ({ open, setOpen, currentItemIndex }) => {
  const [numberOfDays, setNumberOfDays] = useState(-1);
  const [txHash, setTxHash] = useState("");

  // Contract
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi.abi,
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

  // useEffect(() => {
  //   console.log(numberOfDays);
  // }, [numberOfDays]);

  const handleClose = () => {
    setOpen(false);
  };
  const handelApproveClicked = async () => {
    const tx = await contract.functions["rentNft"](
      currentItemIndex,
      await signer.getAddress(),
      numberOfDays,
      Math.floor(Date.now() / 1000)
    );

    const receipt = await tx.wait();

    const { transactionHash } = receipt;

    setTxHash(transactionHash);
  };
  const handelNumberOfDaysChanged = (event: any) => {
    setNumberOfDays(parseInt(event.target.value));
  };
  const item = RENT_CARDS[currentItemIndex];
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
                  onChange={(e) => handelNumberOfDaysChanged(e)}
                />
                <div style={{ marginTop: "3rem" }}></div>
                <Typography variant="body2">
                  Rent Price ..................................1
                </Typography>
                <Typography variant="body2">
                  Daily Rent Price[WETH] ..................................0.01
                </Typography>
                <Typography variant="body2">
                  Collateral[WETH] ..................................0.5
                </Typography>
                <Typography variant="body2">
                  Rent (total)..................................2.0
                </Typography>
                <div style={{ marginTop: "1rem" }}></div>
                <Box marginLeft="-0.75rem" display="flex" flexDirection="row">
                  <Checkbox />
                  <Typography sx={{ margin: "auto 0" }} variant="body2">
                    I agree to the Terms and Conditions
                  </Typography>
                </Box>
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
                      image={require("../../assets/" + item.imageName)}
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
                  <Typography variant="body1">{item.tokenID}</Typography>
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
                    {item.tokenAddress.slice(0, 5) +
                      "......" +
                      item.tokenAddress.slice(-5)}
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
                  <Typography variant="body2">{item.standard}</Typography>
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
