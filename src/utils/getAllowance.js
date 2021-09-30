import { ethers } from "ethers";

export async function Allowance(tokenAddress) {
  const contractAddress = '0xeBf7E248689534C2757a20DCfe7ffe0bb04b9e93';
  let abi = ["function allowance(address _owner, address _spender) public view returns (uint256)"];
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  let signer = provider.getSigner(accounts[0]);

  const contract = new ethers.Contract(tokenAddress, abi, signer);
  let allowance = await contract.allowance(accounts[0], contractAddress);

  return allowance;
}