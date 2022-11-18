import { BigNumber } from "bignumber.js";

export class LendedNFTDetails {
    nftKey: string;
    nftOwner: string;
    nftAddress: string;
    nftId: BigNumber;
    nftName: string;
    nftImageURL: string;
    lenderAddress: string;
    borrowerAddress: string;
    dueDate: number;
    dailyRent: BigNumber;
    collateral: BigNumber;
}