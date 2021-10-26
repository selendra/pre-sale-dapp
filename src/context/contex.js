import { createContext, useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { message } from 'antd';
import { ErrorHandling } from 'utils/errorHandling';

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [priceLoading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [isTrustWallet, setIsTrustWallet] = useState(false || localStorage.getItem('wallet') === 'walletconnect');
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedTokenBalance, setSelectedTokenBalance] = useState('');
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(1);

  const disconnectWallet = () => {
    localStorage.setItem('wallet', '');
    setAccount('');
  }

  const connectMetamask = async() => {
    if(window.ethereum) {
      try {
        await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
          setIsTrustWallet(false);
          localStorage.setItem('wallet', 'metamask');
        });
      } catch (error) {
        ErrorHandling(error)
      }
    } else {
      message.error('Metamask not Detected!')
    }
  }

  const connectTrustWallet = async() => {
    try {
      //  Create WalletConnect Provider
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org"
        },
        qrcodeModalOptions: {
          mobileLinks: ["trust"]
        }
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      const web3Provider = new providers.Web3Provider(provider);

      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      setIsTrustWallet(true);
      localStorage.setItem('wallet', 'walletconnect');
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    if(!selectedToken) return;
    // get user balance on select token
    const getBalance = async() => {
      try {
        let accounts;
        let abi = ["function balanceOf(address _owner) public view returns (uint256)",];

        if(!isTrustWallet) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          accounts = await provider.listAccounts();
        }
        if(isTrustWallet) {
          const provider = new WalletConnectProvider({
            rpc: {
              56: "https://bsc-dataseed.binance.org"
            },
          });
        
          await provider.enable();
        
          const web3Provider = new providers.Web3Provider(provider);
          accounts = await web3Provider.listAccounts();
        }

        if(selectedToken === 'bnb') {
          const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');
          
          let balance = await provider.getBalance(accounts[0]);
          setSelectedTokenBalance(ethers.utils.formatEther(balance));
          // console.log(balance);
        } else {
          const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');
          
          let Contract = new ethers.Contract(
            selectedToken,
            abi,
            provider
          );
          const result = await Contract.balanceOf(accounts[0])
          setSelectedTokenBalance(ethers.utils.formatEther(result._hex));
          // console.log(result);
        }
      } catch (error) {
        console.log(error)
      }
    };
    getBalance(selectedToken);
  },[selectedToken]);

  return(
    <Context.Provider
      value={{
        account,
        isTrustWallet,
        selectedToken,
        selectedTokenPrice,
        selectedTokenBalance,
        priceLoading,
        setSelectedToken,
        setSelectedTokenPrice,
        setLoading,
        connectMetamask,
        connectTrustWallet,
        disconnectWallet
      }}
    >{children}</Context.Provider>
  )
}