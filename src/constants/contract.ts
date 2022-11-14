import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import RentalABI from "./NFTRental.json";

export const contractAddress = "0xd9f4768B521F902E930E1F3238a3bcf3BD66e681";
export const contractAbi = RentalABI;

export const createContract = (signerOrProvider: Signer | Provider) => {
  return new Contract(contractAddress, contractAbi.abi, signerOrProvider);
};
