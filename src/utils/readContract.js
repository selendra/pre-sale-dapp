import { ethers } from "ethers";
import abi from 'contract/presale.json';

export async function ReadContract() {
  const contractAddress = '0x1f1c4e7408C1A1cF2583eD155C7b88274Cf6Ab22';
  const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
  );

  return Contract;
}