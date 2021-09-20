import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/home";
import Info from "./pages/info";
import Order from "./pages/order";

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