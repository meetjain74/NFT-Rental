import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import RentalABI from "./NFTRental.json";
import ERC721 from "./ERC721.json";

export const contractAddress = "0x70e5295292E0d2C68133a8333f42dF937722e15F";
export const contractAbi = RentalABI;
export const ERC721ABI = ERC721;

export const createContract = (signerOrProvider: Signer | Provider) => {
  return new Contract(contractAddress, contractAbi, signerOrProvider);
};
