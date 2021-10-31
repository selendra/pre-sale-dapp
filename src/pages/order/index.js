import { useContext, useEffect, useState } from "react";
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
} from "./styled";
import Spinner from "react-spinkit";
import { Context } from "context/contex";
import { Contract } from "utils/useContract";
import { ContractTrustWallet } from "utils/useContractTrustwallet";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function Order() {
  const contractAddress = '0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F';
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const {
    isTrustWallet
  } = useContext(Context);

  const TimeConverter = (timestamp) => {
    const date = new Date(timestamp * 1000).toLocaleString("en-US", {timeZoneName: "short"})
    return date;
  } 

  
  const claimToken = async(id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = provider.listAccounts();
      
      let signer = provider.getSigner(accounts[0]);
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
    const getOrder = async() => {
      try {
        let contract;
        let accounts;
        if(!isTrustWallet) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          accounts = await provider.listAccounts();
          contract = await Contract();
        }
        if(isTrustWallet) { 
          const provider = new WalletConnectProvider({
            rpc: {
              56: "https://bsc-dataseed.binance.org"
            },
          });
        
          await provider.enable();
        
          const web3Provider = new ethers.providers.Web3Provider(provider);
          accounts = await web3Provider.listAccounts();
          contract = await ContractTrustWallet();
        }
  
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
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    };
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
                    <p>Amount: {new Intl.NumberFormat().format(i.amount)}</p>
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