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
import { ReactComponent as Swap } from 'assets/swap.svg'

import { Context } from "context/contex"
import abi from 'contract/presale.json'
import SelectToken from "components/SelectToken"
import DiscountRateInfo from "components/DiscountRateInfo"
import Spinner from "react-spinkit"
import { ErrorHandling } from "utils/errorHandling"

export default function Home() {
  const contractAddress = '0x9EbCf5d384FF361691c1e2C1552347d5Ce0ff5F4';
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
      ErrorHandling(err);
    }
  }

  async function approve(tokenAddress) {
    try {
      // setLoading(true);
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
            console.log(result)
            handleOrder();
          }
        })
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
    if(!amount) return message.error('Invalid amount!');
    if(!selectedToken) return message.error('Please select a token');
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
          <Text>Discount Rate</Text><br/>
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
          {/* <Row justify='center'>
            <Swap />
          </Row>
          <FormItem label={'Balance: ' + Number(selectedTokenBalance).toFixed(3)}>
            <InputStyled 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </FormItem> */}
          <Row justify='space-between' style={{paddingBottom: '20px'}}>
            <Col style={{display: 'flex'}}>
              <Text>Discount Rate</Text> 
              <DiscountRateInfo />
            </Col>
            <Col>
              <Text>{slippage}%</Text>
            </Col>
          </Row>
          <BtnContribute onClick={handleContribute}>
            <a>
              { loading ? <Spinner name='circle' color='#fac66b' /> : 'Contribute' }
            </a>
          </BtnContribute>
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