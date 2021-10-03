import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { Col, message, Row } from "antd";
import { WarningOutlined } from '@ant-design/icons'
import { ethers } from "ethers";
import { 
  Wrapper, 
  Container, 
  Logo, 
  HeaderItems, 
  Item, 
  BtnConnect, 
  MenuIcon,
  DrawerStyled,
  ModalStyled
} from "./styles";
import bitriel from '../../assets/bitriel.png';
import metamask from '../../assets/metamask.webp';
import bnb from '../../assets/bnb.png';
import menu from 'assets/menu.svg';

export default function Header() {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [balance, setBalance] = useState('');

  const getBalance = async (fromAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let balance = await provider.getBalance(fromAddress);
    setBalance(ethers.utils.formatEther(balance));
  };

  const handleConnect = async() => {
    if(window.ethereum) {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          getBalance(accounts[0]);
        });
      await window.ethereum
        .request({ method: 'eth_chainId' })
        .then(chainId => {
          if(chainId !== '0x38') setModal(true);
        })
    } else {
      message.error('Metamask not detected!!', 5);
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <Wrapper>
      <ModalStyled
        visible={modal}
        onCancel={() => setModal(false)}
        footer=''
      >
        <h2 style={{color: '#fff', fontSize: '24px'}}>Alert! <WarningOutlined style={{color: 'yellow'}} /></h2>
        <p>You are connect to another network, Please switch to Binance Smart Chain network mainnet</p>
      </ModalStyled>
      <Container>
        <Link to="/">
          <Logo alt="bitriel" src={bitriel} />
        </Link>
        <Row>
          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <HeaderItems>
              <Item active={(location.pathname === '/').toString()} to='/'>Contribute</Item>
              <Item active={(location.pathname === '/order').toString()} to='/order'>Activity</Item>
              <Item active={(location.pathname === '/info').toString()} to='/info'>Status</Item>
            </HeaderItems>
          </Col>
          <Col>
            <DrawerStyled placement="right" onClose={() => setNavActive(false)} visible={navActive}>
              <div style={{display: 'block'}}>
                <Row justify='center'>
                  <Logo 
                    alt='bitriel'
                    src={bitriel}
                  />
                </Row><br/>
                <Item mobile='true' active={(location.pathname === '/').toString()} to='/'>Contribute</Item>
                <Item mobile='true' active={(location.pathname === '/order').toString()} to='/order'>Activity</Item>
                <Item mobile='true' active={(location.pathname === '/info').toString()} to='/info'>Status</Item>
              </div>
            </DrawerStyled>
          </Col>
        </Row>
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
        <Col xs={2} sm={2} md={0} lg={0} xl={0} >
          <MenuIcon 
            src={menu}
            alt='menu'
            onClick={() => setNavActive(!navActive)}
          />
        </Col>
      </Container>
    </Wrapper>
  );
}
