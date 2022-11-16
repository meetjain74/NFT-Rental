// useAsync - https://usehooks.com/

import React from "react";
import { Link } from "react-router-dom";

import { Box, List, ListItem, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { styled } from "@mui/system";

import { useAccount, useConnect, useDisconnect, useContract, useSigner, useProvider } from "wagmi";
import { contractAddress, contractAbi } from "../../constants/contract";
import { getSignerAddress } from "../../utils";
import { Contract } from "ethers";
import { FiberNew } from "@mui/icons-material";

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

interface Props {
  marginTop: number;
}

const Navbar: React.FC<Props> = ({ marginTop }) => {
  const {
    connect,
    connectors,
    pendingConnector,
    isLoading
  } = useConnect();

  const { address, connector: activeConnector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Contract
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi,
    signerOrProvider: signer || provider,
  }) as Contract;

  useEffect(() => {
    if (isConnected) {
      // const tx = await contract.functions["addUser"](signer?.getAddress);
      // const receipt = await tx.wait();
      console.log("Connected to Metamask");

      let userExists = true;

      const check = callAsync(
        () => contract.functions["addressToUser"](signer?.getAddress())
      );

      check.then((_receipt: any) => {
        if (_receipt.userAddress==="0x0000000000000000000000000000000000000000") {
          userExists = false;
          console.log("User do not exist yet");
        }
        console.log("User details: "+_receipt.userAddress);
        
        // Call the addUser functionality to add user, if not added
        if (!userExists) {
          const tx = callAsync(
            () => contract.functions["addUser"](signer?.getAddress())
          );

          tx.then((_receipt: any) => {
            console.log("User added");
          }).catch((_err: any) => {
            console.log("User already added"+_err);
          });
      }
      }).catch((_err: any) => {
        console.log("Error to fetch user details "+_err);
      });
    }
  },[isConnected, contract.functions, signer]);


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
          <StyledListItems>Lend</StyledListItems>
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
              key={x.name}
              onClick={() => {
                console.log("Connecting to "+x.name);
                connect({ connector: x });
              }}
              style={{ marginTop: `${marginTop}rem` }}
              variant="outlined"
            >
              {x.name}
              {isLoading && pendingConnector?.id === x.id && " (Connecting)"}
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
