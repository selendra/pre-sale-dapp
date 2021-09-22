import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedTokenBalance, setSelectedTokenBalance] = useState('');

  let abi = [
    "function balanceOf(address _owner) public view returns (uint256)",
  ];

  const getBalance = async() => {
    try {
      if(selectedToken === 'bnb') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        let balance = await provider.getBalance(accounts[0]);
        setSelectedTokenBalance(ethers.utils.formatEther(balance));
      } else {
        const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        let signer = provider.getSigner(accounts[0]);
        let Contract = new ethers.Contract(
          selectedToken,
          abi,
          signer
        );
        const result = await Contract.balanceOf(accounts[0])
        setSelectedTokenBalance(ethers.utils.formatEther(result._hex));
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!selectedToken) return;
    getBalance(selectedToken);
  },[selectedToken])

  return(
    <Context.Provider
      value={{
        selectedToken,
        setSelectedToken,
        selectedTokenBalance
      }}
    >{children}</Context.Provider>
  )
}