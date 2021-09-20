import { message } from "antd";
import { ethers } from "ethers";
import { Wrapper, Container, Logo, HeaderItems, Item, BtnConnect } from "./styles";
import bitriel from '../../assets/bitriel.png';
import metamask from '../../assets/metamask.webp';
import bnb from '../../assets/bnb.png';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [balance, setBalance] = useState('');

  const getBalance = async(fromAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let balance = await provider.getBalance(fromAddress);
    setBalance(ethers.utils.formatEther(balance));
  }

  const handleConnect = async() => {
    if(window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        getBalance(accounts[0]);
      });
      // await window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      //   if(chainId !== '0x38') setModal(true);
      // })
    } else {
      message.error("Metamask not detected!!")
    }
  }

  useEffect(() => {
    handleConnect();
  }, [])

  return (
    <Wrapper>
      <Container>
        <NavLink to='/'>
          <Logo 
            alt='bitriel'
            src={bitriel}
          />
        </NavLink>
        <HeaderItems>
          <Item to='/order'>Order</Item>
          <Item to='/info'>Info</Item>
          <BtnConnect type='ghost' onClick={handleConnect}>
            {
              balance ? (
                <div>
                  <img src={bnb} alt='bnb' width='24' height='24' />
                  <span style={{marginLeft: '4px'}}>{Number(balance).toFixed(3)}</span>
                </div>
              ) : (
                <div>
                  <img src={metamask} alt='metamask' width='24' height='24' /> Connect Wallet
                </div>
              )
            }
          </BtnConnect>
        </HeaderItems>
      </Container>
    </Wrapper>
  )
}
