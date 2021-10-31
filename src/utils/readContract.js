import { ethers } from "ethers";
import abi from 'contract/presale.json';

export async function ReadContract() {
  const contractAddress = '0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F';
  const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
  );

  return Contract;
}