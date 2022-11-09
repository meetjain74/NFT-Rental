import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import RentalABI from "./NFTRental.json";

export const contractAddress = "0x12cDc1Be2b18A8f53047720dc8e1E916666fECD7";
export const contractAbi = RentalABI;

export const createContract = (signerOrProvider: Signer | Provider) => {
  return new Contract(contractAddress, contractAbi.abi, signerOrProvider);
};
