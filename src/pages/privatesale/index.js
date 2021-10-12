import { Container, FormItem, InputStyled, CardStyled } from "./styles";
import { Form, Row } from 'antd';
import SEL from 'assets/sel.png';
import Spinner from 'react-spinkit';
import { useState } from "react";
import { ReactComponent as DoubleDown } from 'assets/double-down.svg'
import { ethers } from "ethers";
import { Signer } from "utils/useSigner";
import abi from 'contract/privatesale.json';

export default function PrivateSale() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const getBalance = async(value) => {
    setAmount(value);
    setLoading(true);
    try {
      const contractAddress = '0x1dE7A8c269488846B2522fda03bfbB5Df97f2C24';
      const signer = await Signer();

      const Contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const data = await Contract.balanceOf(value);
      setBalance(ethers.utils.formatUnits((data._hex), 18))
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <center>
        <p className="home-title">Selendra's SEL</p>
        <p className="home-sub-title">Token Private-Sale</p>
        <br />
      </center>
      <CardStyled>
        <Form layout="vertical" color="white">
          <FormItem
            label={'Wallet Address: '}
          >
            <InputStyled
              placeholder="0.00"
              value={amount}
              onChange={(e) => getBalance(e.target.value)}
              autoFocus
              fullwidth='true'
            />
          </FormItem>
          <Row justify="center">
            <DoubleDown style={{ marginBottom: '20px' }} />
          </Row>
          <FormItem label="Balance:">
            {loading ? (
              <Row justify="center">
                <Spinner name="circle" color="#fac66b" />
              </Row>
            ) : (
              <Row justify="space-between" align="middle">
                <InputStyled
                  readOnly
                  placeholder="0.00"
                  value={balance}
                />
                <div style={{ width: '35%', display: 'inline' }}>
                  <img src={SEL} width="auto" height="32" />
                  <span style={{ color: '#fff', marginLeft: '10px' }}>SEL</span>
                </div>
              </Row>
            )}
          </FormItem>
        </Form>
      </CardStyled>
    </Container>
  )
}
