import { ethers } from "ethers";

export function EtherInstance() {
  const network = 'https://data-seed-prebsc-1-s1.binance.org:8545';

  let provider = new ethers.providers.Web3Provider(network);
  return provider;
}