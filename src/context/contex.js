import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [priceLoading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedTokenBalance, setSelectedTokenBalance] = useState('');
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(1);

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
        selectedTokenPrice,
        selectedTokenBalance,
        priceLoading,
        setSelectedToken,
        setSelectedTokenPrice,
        setLoading
      }}
    >{children}</Context.Provider>
  )
}