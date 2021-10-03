import { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Col, Form, message, Row } from 'antd';
import {
  BtnContribute,
  BtnSelect,
  CardStyled,
  Container,
  FormItem,
  InputStyled,
  Subtitle,
  Text,
  ModalStyled,
} from './styled';
import SelectToken from 'components/SelectToken';

import { Context } from 'context/contex';

import SEL from 'assets/sel.png';
import { ReactComponent as Cog } from 'assets/cog.svg';
import { ReactComponent as Swap } from 'assets/swap.svg';

import { ErrorHandling } from 'utils/errorHandling';
import { Contract } from 'utils/useContract';
import { Allowance } from 'utils/getAllowance';
import { Signer } from 'utils/useSigner';
import Spinner from 'react-spinkit';

export default function Home() {
  const contractAddress = '0x1f1c4e7408C1A1cF2583eD155C7b88274Cf6Ab22';
  const {
    selectedToken,
    selectedTokenBalance,
    selectedTokenPrice,
    priceLoading,
  } = useContext(Context);

  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('10');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkAllowance = async (tokenAddress) => {
    try {
      const allowance = await Allowance(tokenAddress);

      if (!parseInt(allowance._hex)) {
        approve(tokenAddress);
        message.info('Please Approve to spend token!');
      } else {
        handleOrderToken();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderToken = async () => {
    try {
      setLoading(true);
      const contract = await Contract();
      const data = await contract.orderToken(
        selectedToken,
        ethers.utils.parseUnits(amount, 18),
        slippage
      );

      async function Pending() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const result = await provider.getTransactionReceipt(data.hash);
        try {
          if (result === null) {
            setTimeout(() => {
              Pending();
            }, 2000);
          } else if (result !== null) {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        Pending();
      }, 2000);
    } catch (error) {
      ErrorHandling(error);
      setLoading(false);
    }
  };

  const handleOrderBNB = async () => {
    try {
      setLoading(true);
      const contract = await Contract();
      const data = await contract.order(slippage, {
        value: ethers.utils.parseUnits(amount, 18),
      });

      async function Pending() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const result = await provider.getTransactionReceipt(data.hash);
        try {
          if (result === null) {
            setTimeout(() => {
              Pending();
            }, 2000);
          } else if (result !== null) {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        Pending();
      }, 2000);
    } catch (err) {
      ErrorHandling(err);
      setLoading(false);
    }
  };

  async function approve(tokenAddress) {
    try {
      let abi = [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ];

      setLoading(true);
      const signer = await Signer();
      let TokenContract = new ethers.Contract(tokenAddress, abi, signer);

      const data = await TokenContract.approve(
        contractAddress,
        ethers.utils.parseUnits(Math.pow(10, 18).toString(), 18)
      );

      async function PendingApprove() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const result = await provider.getTransactionReceipt(data.hash);
          if (result === null) {
            setTimeout(() => {
              PendingApprove();
            }, 2000);
          } else if (result !== null) {
            handleOrderToken();
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        PendingApprove();
      }, 2000);
    } catch (error) {
      setLoading(false);
      ErrorHandling(error);
    }
  }

  const handleContribute = () => {
    if (!amount) return message.error('Invalid amount!');
    if (!selectedToken) return message.error('Please select a token');
    if (selectedToken === 'bnb') {
      handleOrderBNB();
    } else {
      checkAllowance(selectedToken);
    }
  };

  const EstimateSEL = (amount) => {
    if (!selectedToken) return 0;
    if (slippage === '10') {
      return (amount * selectedTokenPrice) / 0.027;
    }
    if (slippage === '20') {
      return (amount * selectedTokenPrice) / 0.025;
    }
    if (slippage === '30') {
      return (amount * selectedTokenPrice) / 0.021;
    }
  };

  return (
    <Container>
      <ModalStyled
        visible={modal}
        title="Settings"
        footer=""
        title=""
        onCancel={() => setModal(false)}
      >
        <div>
          <Row align="middle" justify="center">
            <Subtitle>Discount</Subtitle>
          </Row>
          <br />
          <Row align="middle" justify="space-between">
            <Col span={10}>
              <BtnSelect
                active={(slippage === '10').toString()}
                onClick={() => setSlippage('10')}
              >
                10%
              </BtnSelect>
            </Col>
            <Col span={12}>
              <Text>: 1 year vesting lock</Text>
            </Col>
          </Row>
          <br />
          <Row align="middle" justify="space-between">
            <Col span={10}>
              <BtnSelect
                active={(slippage === '20').toString()}
                onClick={() => setSlippage('20')}
              >
                20%
              </BtnSelect>
            </Col>
            <Col span={12}>
              <Text>: 2 year vesting lock</Text>
            </Col>
          </Row>
          <br />
          <Row align="middle" justify="space-between">
            <Col span={10}>
              <BtnSelect
                active={(slippage === '30').toString()}
                onClick={() => setSlippage('30')}
              >
                30%
              </BtnSelect>
            </Col>
            <Col span={12}>
              <Text>: 3 year vesting lock</Text>
            </Col>
          </Row>
          <br />
        </div>
      </ModalStyled>
      {/* <Row justify="center" align="middle">
        <Col>
          <Subtitle>Contribute</Subtitle>
        </Col>
      </Row> */}
      <br />
      <CardStyled>
        <Form layout="vertical" color="white">
          <FormItem
            label={'Balance: ' + Number(selectedTokenBalance).toFixed(3)}
          >
            <InputStyled
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
            <SelectToken />
          </FormItem>
          <Row justify="center">
            <Swap style={{ marginBottom: '20px' }} />
          </Row>
          <FormItem label="To (estimated)">
            {priceLoading ? (
              <Row justify="center">
                <Spinner name="circle" color="#fac66b" />
              </Row>
            ) : (
              <Row justify="space-between" align="middle">
                <InputStyled
                  readOnly
                  placeholder="0.00"
                  value={EstimateSEL(amount).toFixed(2)}
                />
                <div style={{ width: '35%', display: 'inline' }}>
                  <img src={SEL} width="auto" height="32" />
                  <span style={{ color: '#fff', marginLeft: '10px' }}>SEL</span>
                </div>
              </Row>
            )}
          </FormItem>
          <Row justify="end" style={{ paddingBottom: '20px' }}>
            <Text>Discount {slippage}%</Text>
            <Button
              style={{ border: 'none', padding: '0' }}
              type="ghost"
              onClick={() => setModal(true)}
            >
              <Cog />
            </Button>
          </Row>
          <BtnContribute
            type="ghost"
            loading={loading}
            onClick={handleContribute}
          >
            Contribute
          </BtnContribute>
        </Form>
      </CardStyled>
      {/*  */}
      <Subtitle>How it works?</Subtitle>
      <p>
        A very simple and easy method for participation in a presale Please
        follow the steps: <br />
        1. Connect you metamask wallet. <br />
        2. Enter the contribution amount in BNB. <br />
        3. Press Contribute. <br />
        <br />
        OFFICIAL SELENDRA TOKEN ADDRESS :
        0xF3840e453f751ecA77467da08781C58C1A156B04
      </p>
    </Container>
  );
}
