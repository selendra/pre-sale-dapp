import { useState, useEffect } from 'react'
import { Col, Row } from "antd"
import { ethers } from "ethers"
import abi from 'contract/presale.json'
import { CardStyled, Container, SubTitle, Text, Title } from './styled'
import { ErrorHandling } from 'utils/errorHandling'

export default function Info() {
  const contractAddress = '0xE0b8d681F8b26F6D897CC3922be0357C9116A852';
  const [remainToken, setRemainToken] = useState('');
  const [tokenRaised, setTokenraised] = useState('');
  const [tokenSold, setTokenSold] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');

  const Fetch = async() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      let signer = provider.getSigner(accounts[0]);
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      )

      const remaining = await contract.functions.remainingTokens();
      const sold = await contract.functions.totalDistributed();
      const price = await contract.functions.getPrice();

      setRemainToken(ethers.utils.formatUnits((remaining[0]._hex), 18));
      setTokenSold(ethers.utils.formatUnits((sold[0]._hex), 18));
      setTokenPrice(ethers.utils.formatUnits(price[0]._hex, 8));
    } catch (err) {
      ErrorHandling(err);
    }
  }

  useEffect(() => {
    Fetch();
  },[])

  return (
    <Container>
      <Title>Status</Title>
        <Row justify='space-around'>
          <Col md={10} lg={7}>
            <CardStyled>
              <SubTitle>Token Sold</SubTitle>
              <Text>$ {Number(tokenSold) * 0.027}</Text>
            </CardStyled>
          </Col>
          <Col lg={7}>
            <CardStyled>
              <SubTitle>Token Remaining</SubTitle>
              <Text>{Number(remainToken).toFixed(3)} SEL</Text>
            </CardStyled>
          </Col>
          <Col lg={7}>
            <CardStyled>
              <SubTitle>Token Price</SubTitle>
              <Text>$ 0.027</Text>
            </CardStyled>
          </Col>  
        </Row>       
    </Container>
  )
}