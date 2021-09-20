import { useState } from "react"
import { ethers, utils } from "ethers"
import { Button, Card, Col, Form, Input, message, Modal, Row, Popover } from "antd"
import styled from "styled-components"
import { ReactComponent as Swap } from '../assets/swap.svg'
import { ReactComponent as Cog } from '../assets/cog.svg'
import { ReactComponent as Question } from '../assets/question.svg'
import bnb from '../assets/bnb.png'
import sel from '../assets/sel.png'
import abi from '../contract/presale.json'

const content = (
  <div>
    <ul>
      <li>1 yr vesting: 10% discount</li>
      <li>2 yr vesting: 20% discount</li>
      <li>3 yr vesting: 30% discount</li>
    </ul>
  </div>
);

export default function Home() {
  let signer;
  const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [slippage, setSlippage] = useState('10');
  const [modal, setModal] = useState(false);

  function validateSlippage(value){
    if(value > 100) { value = 100 };
    setSlippage(value.toString());
  }

  const handleContrib = async() => {
    if(!amount) message.error('Invalid amount!')
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = provider.listAccounts();
      
      signer = provider.getSigner(accounts[0]);
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      )

      const data = await contract.order(slippage, {
        value: ethers.utils.parseUnits(amount, 18)
      })
    } catch (err) {
      if(err.code === 4001) message.error('The request was rejected!');
      if(err.code === -32603) {
        if(err.data.code === -32000) message.error('Invalid Input!');
        if(err.data.code === 3) message.error('Less than mininum investment!');
      }
    }
  }

  return (
    <Container>
      <Modal
        visible={modal}
        title='Settings'
        footer=''
        onCancel={()=>setModal(false)}
      >
        <div>
          <Text>Discount Rate</Text>
          <br/>
          <Row>
            <Col span={6} offset={1}>
              <BtnSelect onClick={()=>setSlippage('10')}>10%</BtnSelect>
            </Col>
            <Col span={6} offset={1}>
              <BtnSelect onClick={()=>setSlippage('20')}>20%</BtnSelect>
            </Col>
            <Col span={6} offset={1}>
              <BtnSelect onClick={()=>setSlippage('30')}>30%</BtnSelect>
            </Col>
          </Row>
        </div>
      </Modal>
      <Row justify='space-between' align='middle'>
        <Col>
          <Subtitle>Contribute</Subtitle>
        </Col>
        <Col>
          <Button style={{border: 'none'}} type='ghost' onClick={() => setModal(true)}>
            <Cog />
          </Button>
        </Col>
      </Row>
      <br/>
      <CardStyled>
        <Form layout="vertical" color="white">
          <FormItem label='Balance: 0.00'>
            <InputStyled placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Btntoken type='ghost'>
              <img src={bnb} alt='bnb' width='24' />
              <span>BNB</span>
            </Btntoken>
          </FormItem>
          {/* <Swap />
          <FormItem label='Balance: 0.00'>
            <InputStyled placeholder="0.00" value={(Number(price) * contrib)} />
            <Btntoken type='ghost'>
              <img src={sel} alt='sel' width='24' />
              <span>SEL</span>
            </Btntoken>
          </FormItem> */}
          <Row justify='space-between' style={{paddingBottom: '20px'}}>
            <Col style={{display: 'flex'}}>
              <Text>Discount Rate</Text> 
              <Popover content={content}>
                <Question />
              </Popover>
            </Col>
            <Col>
              <Text>{slippage}%</Text>
            </Col>
          </Row>
          <BtnContribute onClick={handleContrib}>Contribute</BtnContribute>
        </Form>
      </CardStyled>
      <Subtitle>How it works?</Subtitle>
      <p>
        A very simple and easy method for participation in a presale
        Please follow the steps: <br/>
        1. Connect you metamask wallet. <br/>
        2. Enter the contribution amount in BNB. <br/>
        3. Press Contribute. <br/>
        OFFICIAL SELENDRA TOKEN ADDRESS : 0xF3840e453f751ecA77467da08781C58C1A156B04
      </p>
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
`
const FormItem = styled(Form.Item)`
  display: flex;
  background: #000829;
  border-radius: 4px;
  label {
    font-weight: 700;
    color: #85858D;  
    padding: 10px;
  }
`
const InputStyled = styled(Input)`
  width: 70%;
  font-size: 20px;
  font-weight: 800;
  color: #FFF;
  background: #000829;
  border-radius: 5px;
  border: none;
  padding: .75rem .75rem .75rem 1rem;
  &:focus {
    box-shadow: none!important;
  }
`
const BtnContribute = styled(Button)`
  border: 1px solid rgb(90, 196, 190);
  border-radius: 5px;
  height: 50px;
  width: 100%;
  background: transparent;
  color: #f5f5f5;
  :hover,
  :focus {
    background-color: transparent;
    border-color: rgb(90, 196, 190);
    color: rgb(90, 196, 190);
  }
`
const BtnSelect = styled(Button)`
  width: 100%;
  color: #fff;
  background: #131a35;
  border: none;
  border-radius: 5px;
  :focus,
  :hover {
    background: #5ac4be;
    color: #fff;
  }
`
const Subtitle = styled.p`
  padding: 15px 0;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`
const Text = styled.p`
  font-size: 14px;
  color: #f1f1f2;
  display: flex;
  margin: 0 10px;
`
const Btntoken = styled(Button)`
  border: none;
  color: #FFF;
  span {
    margin: 0 4px;
  }
  :hover {
    color: #FFF;
  }
`