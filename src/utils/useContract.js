import { ethers } from "ethers";
import abi from 'contract/presale.json';
import { Signer } from "./useSigner";

export async function Contract() {
  const contractAddress = '0xeBf7E248689534C2757a20DCfe7ffe0bb04b9e93';
  const signer = await Signer();

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return Contract;
}