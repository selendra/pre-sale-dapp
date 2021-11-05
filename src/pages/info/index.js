import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'antd';
import { CardStyled, Container, SubTitle, Text } from './styled';
import { ErrorHandling } from 'utils/errorHandling';
import { ReadContract } from 'utils/readContract';

export default function Info() {
  const [remainToken, setRemainToken] = useState('');
  const [tokenSold, setTokenSold] = useState('');
  let lastRemainToken = ethers.utils.formatUnits('376889953084070095238095239', 18);
  let lastTokenSold = ethers.utils.formatUnits('101164915929904761904761', 18);

  const Fetch = async () => {
    try {
      const contract = await ReadContract();

      const remaining = await contract.functions.remainingTokens();
      const sold = await contract.functions.totalDistributed();

      setRemainToken(ethers.utils.formatUnits(remaining[0]._hex, 18));
      setTokenSold(ethers.utils.formatUnits(sold[0]._hex, 18));
    } catch (err) {
      ErrorHandling(err);
    }
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <Container>
      {/* <Title>Status</Title> */}
      <Row justify="space-around">
        <Col md={{ span: 10, offset: 0 }} lg={7}>
          <CardStyled>
            <SubTitle>Fundraising</SubTitle>
            <Text>$ 1,600,000.00</Text>
          </CardStyled>
        </Col>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 7, offset: 0 }}>
          <CardStyled>
            <SubTitle>Token Remaining</SubTitle>
            <Text>{new Intl.NumberFormat().format(Number(lastRemainToken) + Number(remainToken))} SEL</Text>
          </CardStyled>
        </Col>
        <Col md={12} lg={7}>
          <CardStyled>
            <SubTitle>Token Sold</SubTitle>
            <Text>{new Intl.NumberFormat().format(Number(tokenSold) + Number(lastTokenSold))} SEL</Text>
          </CardStyled>
        </Col>
      </Row>
    </Container>
  );
}
