import { ethers } from "ethers";

export async function Signer() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();

  let signer = provider.getSigner(accounts[0]);

  return signer;
}