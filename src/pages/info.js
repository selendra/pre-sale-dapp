import { useState } from 'react'
import { Card, Col, Row } from "antd"
import { ethers } from "ethers"
import { useEffect } from "react"
import styled from "styled-components"
import abi from '../contract/presale.json'

export default function Info() {
  let signer;
  const [remainToken, setRemainToken] = useState('');
  const [tokenRaised, setTokenraised] = useState('');
  const [tokenSold, setTokenSold] = useState('');
  const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';

  const Fetch = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.listAccounts()
    .then(async function(accounts) {
      signer = provider.getSigner(accounts[0]);
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      )

      const remaining = await contract.functions.remainingTokens();
      const sold = await contract.functions.totalDistributed();
  
      setRemainToken(ethers.utils.formatUnits((remaining[0]._hex), 18));
      setTokenSold(ethers.utils.formatUnits((sold[0]._hex), 18));
    });
  }


  useEffect(() => {
    Fetch();
  },[])

  return (
    <Container>
      <CardStyled>
        <Background>
          <span style={{fontSize: '18px'}}>Token Status</span>
        </Background>
        <Row justify='space-between'>
          <Col span={10}>
            <Background>
              <span>Tokens Raised</span>
              <p>{Number(tokenSold) + Number(remainToken)}</p>
            </Background>
          </Col>
          <Col span={10}>
            <Background>
              <span>Token Sold</span>
              <p>{Number(tokenSold).toFixed(3)}</p>
            </Background>
          </Col>
        </Row>
        <Background>
          <span>Token Remaining</span>
          <p>{Number(remainToken).toFixed(3)}</p>
        </Background>
      </CardStyled>
    </Container>
  )
}

const Container = styled.div`
  max-width: 400px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;
`
const CardStyled = styled(Card)`
  border: 1px solid rgb(90, 196, 190);
  background-color: transparent;
  border-radius: 5px;
  text-align: center;
`
const Background = styled.div`
  color: #fff;
  background: #1a2843;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`