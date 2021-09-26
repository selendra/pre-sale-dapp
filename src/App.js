import { 
  BrowserRouter as 
  Router, 
  Route, 
  Switch  
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
        <Route exact path='/info' component={Info} />
        <Route exact path='/order' component={Order} />
      </Switch>
      <Footer />
    </Router>
  );
}