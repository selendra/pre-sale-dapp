import { ethers } from "ethers";

export async function Allowance(tokenAddress) {
  const contractAddress = '0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F';
  let abi = ["function allowance(address _owner, address _spender) public view returns (uint256)"];
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  let signer = provider.getSigner(accounts[0]);

  const contract = new ethers.Contract(tokenAddress, abi, signer);
  let allowance = await contract.allowance(accounts[0], contractAddress);

  return allowance;
}