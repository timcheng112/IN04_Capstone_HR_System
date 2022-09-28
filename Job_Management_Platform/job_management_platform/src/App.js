import "./App.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import LandingPage from "./pages/Landing";
import TimeoutPage from "./pages/Timeout";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/timeout" component={TimeoutPage} />
          <PrivateRoute exact path="/landing" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
