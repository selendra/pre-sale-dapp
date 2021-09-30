import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { message } from "antd";
import { ethers } from "ethers";
import { 
  Wrapper, 
  Container, 
  Logo, 
  HeaderItems, 
  Item, 
  BtnConnect 
} from "./styles";
import bitriel from '../../assets/bitriel.png';
import metamask from '../../assets/metamask.webp';
import bnb from '../../assets/bnb.png';

export default function Header() {
  const location = useLocation();
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
    } else {
      message.error("Metamask not detected!!")
    }
  }

  useEffect(() => {
    handleConnect();
  }, []);


  return (
    <Wrapper>
      <Container>
        <Link to='/'>
          <Logo 
            alt='bitriel'
            src={bitriel}
          />
        </Link>
        <HeaderItems>
          <Item active={(location.pathname === '/').toString()} to='/'>Contribute</Item>
          <Item active={(location.pathname === '/order').toString()} to='/order'>Activity</Item>
          <Item active={(location.pathname === '/info').toString()} to='/info'>Status</Item>
        </HeaderItems>
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
      </Container>
    </Wrapper>
  )
}
