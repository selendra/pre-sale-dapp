import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../contract/presale.json';

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const ContractAddress = '0x434bcF8bA7076d523aBC55b687e0b7e8DEd70FDe';
  const [signer, setSigner] = useState();

  const getSigner = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    provider.listAccounts()
    .then(function(accounts) {
      setSigner(provider.getSigner(accounts[0]));
    });
  }

  useEffect(() => {
    getSigner();
  },[])

  return(
    <Context.Provider
      value={{
        signer
      }}
    >{children}</Context.Provider>
  )
}