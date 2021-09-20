import { ethers } from "ethers";
import abi from '../contract/presale.json';

export function ContractInstance() {
  const address = '0xF3840e453f751ecA77467da08781C58C1A156B04';

  let contract = new ethers.Contract(address, abi);
  return contract;
}