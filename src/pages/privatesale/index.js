import { useState } from "react";
import { Form, Row, Collapse } from 'antd';
import { ethers } from "ethers";
import { Container, FormItem, InputStyled, CardStyled, CollapseStyled } from "./styles";
import { ReactComponent as DoubleDown } from 'assets/double-down.svg'
import Spinner from 'react-spinkit';
import SEL from 'assets/sel.png';
import abi from 'contract/privatesale.json';

export default function PrivateSale() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const TimeConverter = (timestamp) => {
    const date = new Date(timestamp * 1000).toLocaleString("en-US", {timeZoneName: "short"})
    return date;
  }

  const getBalance = async(value) => {
    setAmount(value);
    setLoading(true);
    setOrders([]);
    try {
      const contractAddress = '0x1dE7A8c269488846B2522fda03bfbB5Df97f2C24';
      const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');

      const Contract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      );

      const data = await Contract.balanceOf(value);
      setBalance(ethers.utils.formatUnits((data._hex), 18));

      const orderIds = await Contract.investorOrderIds(value);

      orderIds.map(async(i) => {
        const data = await Contract.orders(i._hex);
        const object = {
          order_id: Number(i._hex),
          order_hex: i._hex,
          amount: ethers.utils.formatUnits(data.amount._hex, 18),
          release_on_block: TimeConverter(Number(data.releaseOnBlock._hex)),
        }
        setOrders(prevItem => [...prevItem, object]);
      })
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
        <p className="home-sub-title">Please paste your address to view your token holding</p>
        <br />
      </center>
      <CardStyled>
        <Form layout="vertical" color="white">
          <FormItem
            label={'Wallet Address: '}
          >
            <InputStyled
              placeholder="0x"
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
                  value={new Intl.NumberFormat().format(balance)}
                />
                <div style={{ width: '20%', display: 'inline' }}>
                  <img src={SEL} alt='SEL' width="auto" height="32" />
                  <span style={{ color: '#fff', marginLeft: '10px' }}>SEL</span>
                </div>
              </Row>
            )}
          </FormItem>
          <div>
            {orders.map((i) => 
              <CollapseStyled key={i.order_id}>
                <Collapse.Panel header={`Order ID: ${i.order_id}`} bordered={false} key={i.order_id}>
                  <p>Amount: {new Intl.NumberFormat().format(i.amount)}</p>
                  <p>Release on: {i.release_on_block}</p>
                </Collapse.Panel>
              </CollapseStyled>
            )}
          </div>
        </Form>
      </CardStyled>
    </Container>
  )
}
