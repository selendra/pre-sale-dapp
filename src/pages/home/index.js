import { useContext, useState } from "react"
import { ethers } from "ethers"
import { 
  Button, 
  Col, 
  Form, 
  message, 
  Modal, 
  Row, 
} from "antd"
import { 
  BtnContribute,
  BtnSelect,
  CardStyled,
  Container,
  FormItem,
  InputStyled,
  Subtitle,
  Text
} from "./styled"
import { ReactComponent as Cog } from 'assets/cog.svg'

import { Context } from "context/contex"
import abi from 'contract/presale.json'
import SelectToken from "components/SelectToken"
import DiscountRateInfo from "components/DiscountRateInfo"

export default function Home() {
  const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';
  const { selectedToken, selectedTokenBalance } = useContext(Context);

  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('10');
  const [modal, setModal] = useState(false);
  const [loading , setLoading] = useState(false);


  const checkAllowance = async(tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    let abi = [
      "function allowance(address _owner, address _spender) public view returns (uint256)",
    ];
    let signer = provider.getSigner(accounts[0]);

    const contract = new ethers.Contract(tokenAddress, abi, signer);
    let allowance = await contract.allowance(accounts[0], contractAddress);
    
    if(!parseInt(allowance._hex)) { 
      approve(tokenAddress);
      message.info('Please Approve to spend token!')
    } 
  }

  const handleOrder = async() => {
    try {
      if(selectedToken === 'bnb') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        let signer = provider.getSigner(accounts[0]);
        let Contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        const data = await Contract.order(
          slippage,
          {
            value: ethers.utils.parseUnits(amount, 18)
          }
        )
      } else {
        checkAllowance(selectedToken);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        let signer = provider.getSigner(accounts[0]);
        let Contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        const data = await Contract.orderToken(
          selectedToken,
          ethers.utils.parseUnits(amount, 18),
          slippage
        )
      }
    } catch (err) {
      if(err.code === 4001) message.error('The request was rejected!');
      if(err.code === -32603) message.error(err.data.message);
    }
  }

  async function approve(tokenAddress) {
    try {
      setLoading(true);
      let abi = [
        "function approve(address _spender, uint256 _value) public returns (bool success)",
      ];

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = provider.listAccounts();
      
      let signer = provider.getSigner(accounts[0]);
      let TokenContract = new ethers.Contract(
        tokenAddress,
        abi,
        signer
      );
      
      const result = await TokenContract.approve(
        contractAddress,
        ethers.utils.parseUnits(Math.pow(10, 18).toString(), 18)
      )
      
      async function PendingApprove() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.getTransactionReceipt(result.hash, async function(error, result) { 
          if(result === null || error) {
            setTimeout(() => {
              PendingApprove();
            }, 2000);
          } else if(result !== null || !error) { 
            handleOrder();
          }
        })
      }

      setTimeout(() => {
        PendingApprove();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  const handleContribute = () => {
    if(!amount) message.error('Invalid amount!');
    handleOrder();
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
          <FormItem label={'Balance: ' + Number(selectedTokenBalance).toFixed(3)}>
            <InputStyled 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
            <SelectToken />
          </FormItem>
          <Row justify='space-between' style={{paddingBottom: '20px'}}>
            <Col style={{display: 'flex'}}>
              <Text>Discount Rate</Text> 
              <DiscountRateInfo />
            </Col>
            <Col>
              <Text>{slippage}%</Text>
            </Col>
          </Row>
          <BtnContribute loading={loading} onClick={handleContribute}>Contribute</BtnContribute>
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