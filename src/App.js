import PrivateSale from "pages/privatesale";
import { 
  BrowserRouter as 
  Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/home/index";
import Info from "./pages/info/index";
import Order from "./pages/order/index";

export default function App() {
  if(window.ethereum) {
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    window.ethereum.on('accountsChanged', (accounts) => window.location.reload());
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/info' component={Info} />
        <Route path='/order' component={Order} />
        <Route path='/privatesale' component={PrivateSale} />
        <Route path='/sel-pre-sale'>
          <Redirect to='/' />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}