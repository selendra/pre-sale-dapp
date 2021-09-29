import { ethers } from "ethers";
import abi from 'contract/presale.json';
import { Signer } from "./useSigner";

export async function Contract() {
  const contractAddress = '0xE0b8d681F8b26F6D897CC3922be0357C9116A852';
  const signer = await Signer();

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return Contract;
}