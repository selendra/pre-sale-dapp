import { ethers } from "ethers";
import abi from 'contract/presale.json';
import { Signer } from "./useSigner";

export async function Contract() {
  const contractAddress = '0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F';
  const signer = await Signer();

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return Contract;
}