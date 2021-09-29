import { useState, useEffect } from 'react'
import { Col, Row } from "antd"
import { ethers } from "ethers"
import { CardStyled, Container, SubTitle, Text, Title } from './styled'
import { ErrorHandling } from 'utils/errorHandling'
import { Contract } from 'utils/useContract'

export default function Info() {
  const [remainToken, setRemainToken] = useState('');
  const [tokenSold, setTokenSold] = useState('');

  const Fetch = async() => {
    try {
      const contract = await Contract();

      const remaining = await contract.functions.remainingTokens();
      const sold = await contract.functions.totalDistributed();

      setRemainToken(ethers.utils.formatUnits((remaining[0]._hex), 18));
      setTokenSold(ethers.utils.formatUnits((sold[0]._hex), 18));
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
              <Text>$ {(Number(tokenSold) * 0.027).toFixed(3)}</Text>
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