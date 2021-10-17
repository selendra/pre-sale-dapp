import { useEffect, useState } from "react";
import { 
  BrowserRouter as 
  Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { WarningOutlined } from '@ant-design/icons'

import Home from "pages/home/index";
import Info from "pages/info/index";
import Order from "pages/order/index";
import PrivateSale from "pages/privatesale";
import Footer from "components/Footer";
import Header from "components/Header";
import ModalComponent from "components/Modal";


export default function App() {
  const [modal, setModal] = useState(false);

  if(window.ethereum) {
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    window.ethereum.on('accountsChanged', () => window.location.reload());
  }

  useEffect(() => {
    const validate = async() => {
        if(window.ethereum) {
        await window.ethereum
        .request({ method: 'eth_chainId' })
        .then(chainId => {
          if(chainId !== '0x38') setModal(true);
        })
      }
    }
    validate();
  },[])

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/info' component={Info} />
          <Route path='/order' component={Order} />
          <Route path='/mysel' component={PrivateSale} />
          <Route path='/sel-pre-sale'>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
      </Router>
      
      <ModalComponent
        visible={modal}
        onCancel={() => setModal(false)}
      >
        <h2 style={{color: '#fff', fontSize: '24px'}}>Alert! <WarningOutlined style={{color: 'yellow'}} /></h2>
        <p>You are connect to another network, Please switch to Binance Smart Chain network mainnet</p>
      </ModalComponent>
    </div>
  );
}