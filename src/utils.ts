import type { Signer } from "ethers";

export const getSignerAddress = async (signer: Signer) => {
  if (!signer) {
    return null;
  }

  return await signer.getAddress();
};
