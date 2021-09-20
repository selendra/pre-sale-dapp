import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Table } from "antd";
import styled from "styled-components";
import abi from '../contract/presale.json';

export default function Order() {
  let signer;
  const contractAddress = '0x0Cc4FaF8DA3e278805830879CA776A3f9872D7aF';
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <span>{Number(record.amount).toFixed(3)}</span>
      )
    },
    {
      title: 'Release on block',
      dataIndex: 'release_on_block',
      key: 'release_on_block',
    },
    {
      title: 'Claim',
      dataIndex: 'claim',
      key: 'claim',
      render: (text, record) => (
        <div>
          {
            (record.claim === 'false') ? (
              <Button type='text' style={{color: 'cyan'}} onClick={() => claimToken(record.order_hex)}>Claim</Button>
            ) : (
              <span style={{color: 'cyan'}}>Claimed</span>
            )
          }
        </div>
      ),
    },
  ];

  const getOrder = () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts()
      .then(async function(accounts) {
        signer = provider.getSigner(accounts[0]);
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        )

        const data = await contract.investorOrderIds(accounts[0]);
        
        data.map(async(i) => {
          const data = await contract.orders(i._hex);
          const object = {
            order_id: parseInt(i._hex),
            order_hex: i._hex,
            amount: ethers.utils.formatUnits(data.amount._hex, 18),
            release_on_block: parseInt(data.releaseOnBlock._hex),
            claim: (data.claimed).toString(),
          }
          setOrders(prevItem => [...prevItem, object]);
        })
        setLoading(false)
      });
    } catch(err) {
      console.log(err)
    }
  }

  const claimToken = async(id) => {
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
        const data = await contract.redeem(id);
      });
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOrder();
  },[])

  return (
    <Container>
      <Table loading={loading} dataSource={orders} columns={columns} rowKey={record => record.order_id} />
    </Container>
  )
}

const Container = styled.div`
  max-width: 500px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;

  .ant-table,
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    color: #f1f1f2;
    background-color: #1a2843;
    :hover {
      background: #1a2843;
    }
  }
  .ant-table-tbody > tr.ant-table-row-level-0:hover > td {
    background: unset;
  }
  .ant-table-thead {
    border-radius: 5px;
  }
  .ant-table-content {
    border-radius: 5px;
  }
`