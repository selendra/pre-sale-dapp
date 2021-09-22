import { ethers } from "ethers";
import abi from 'contract/presale.json';

export async function ContractInstance() {
  const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  
  let signer = provider.getSigner(accounts[0]);
  let Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  console.log(Contract)
  
  return Contract;
}