import { ethers } from "ethers";

export class LendedNFTDetails {
    nftKey: string;
    nftOwner: string;
    nftAddress: string;
    nftId: ethers.BigNumber;
    nftName: string;
    nftImageURL: string;
    lenderAddress: string;
    borrowerAddress: string;
    dueDate: number;
    dailyRent: ethers.BigNumber;
    collateral: ethers.BigNumber;
}