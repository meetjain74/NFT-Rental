import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import RentalABI from "./NFTRental.json";
import ERC721 from "./ERC721.json";

export const contractAddress = "0x7E2f2557B59Be039Bcec550756e3B6d8dB3806A8";
export const contractAbi = RentalABI;
export const ERC721ABI = ERC721;

export const createContract = (signerOrProvider: Signer | Provider) => {
  return new Contract(contractAddress, contractAbi, signerOrProvider);
};
