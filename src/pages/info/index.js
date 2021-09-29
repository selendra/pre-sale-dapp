import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Col, Row } from "antd"
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

  const chartData = {
    labels: ['Public Sale IDO', 'Private Sale'],
    datasets: [{
      labels: 'Token Sale',
      data: [
        282743338,
        94274779
      ],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
    }]
  }

  useEffect(() => {
    Fetch();
  },[]);

  return (
    <Container>
      <Title>Status</Title>
        <Row justify='space-around'>
          <Col md={{span: 10, offset: 0}} lg={7}>
            <CardStyled>
              <SubTitle>Fundraising</SubTitle>
              <Text>$ 1,600,000</Text>
            </CardStyled>
          </Col>
          <Col md={{span: 10, offset: 1}} lg={{span: 7, offset: 0}}>
            <CardStyled>
              <SubTitle>Token Remaining</SubTitle>
              <Text>{Number(remainToken).toFixed(3)} SEL</Text>
            </CardStyled>
          </Col>
          <Col md={12} lg={7}>
            <CardStyled>
              <SubTitle>Token Sold</SubTitle>
              <Text>{Number(tokenSold).toFixed(3)} SEL</Text>
            </CardStyled>
          </Col>  
        </Row> 
    </Container>
  )
}