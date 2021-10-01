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
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/info' component={Info} />
        <Route path='/order' component={Order} />
        <Route path='/sel-pre-sale'>
          <Redirect to='/' />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}