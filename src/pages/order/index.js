import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Collapse, Empty, Row } from "antd";
import abi from 'contract/presale.json';
import { ErrorHandling } from "utils/errorHandling";
import { 
  CardStyled, 
  CollapseStyled, 
  Container, 
  Title, 
  BtnClaim, 
  Text
} from "./styled";
import Spinner from "react-spinkit";

export default function Order() {
  let signer;
  const contractAddress = '0x9EbCf5d384FF361691c1e2C1552347d5Ce0ff5F4';
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const TimeConverter = (timestamp) => {
    const date = new Date(1632675306 * 1000).toLocaleString("en-US", {timeZoneName: "short"})
    return date;
  } 

  const getOrder = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts()
      .then(async function(accounts) {
        signer = provider.getSigner(accounts[0]);
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        )

        const data = await contract.investorOrderIds(accounts[0])
        
        data.map(async(i) => {
          const data = await contract.orders(i._hex);
          const object = {
            order_id: parseInt(i._hex),
            order_hex: i._hex,
            amount: ethers.utils.formatUnits(data.amount._hex, 18),
            release_on_block: TimeConverter(parseInt(data.releaseOnBlock._hex)),
            claim: (data.claimed).toString(),
          }
          setOrders(prevItem => [...prevItem, object]);
        })
        console.log(orders);
        setLoading(false);
      });
    } catch(err) {
      console.log(err);
    }
  }

  const claimToken = async(id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = provider.listAccounts();
      
      signer = provider.getSigner(accounts[0]);
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      )

      await contract.redeem(id);
    } catch(err) {
      ErrorHandling(err);
    }
  }

  useEffect(() => {
    getOrder();
  },[])

  return (
    <Container>
      <Title>Activity</Title>
      <CardStyled>
        { 
          loading ? (
            <Row justify='center'> 
              <Spinner name='circle' color='#fac66b' /> 
            </Row>
          ) : (orders.length === 0) ? 
              <Empty 
                description={
                  <span>
                    No Activity Yet
                  </span>
                }
              /> : 
              orders.map((i) => 
                <CollapseStyled key={i.order_id}>
                  <Collapse.Panel header={`Order ID: ${i.order_id}`} bordered={false} key={i.order_id}>
                    <p>Amount: {i.amount}</p>
                    <p>Release on: {i.release_on_block}</p>
                    { 
                      (i.claim === "true") ? (
                        <BtnClaim type='ghost'>Claimed</BtnClaim>
                      ) : (
                        <BtnClaim type='ghost' onClick={() => claimToken(i.order_hex)}>Claim</BtnClaim>
                      ) 
                    }
                  </Collapse.Panel>
                </CollapseStyled>
              )
          
        }
      </CardStyled>
    </Container>
  )
}