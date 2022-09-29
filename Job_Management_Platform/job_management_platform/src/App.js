import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import LandingPage from "./pages/Landing";
import TimeoutPage from "./pages/Timeout";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/verify/:token" component={Verification} />
          <PublicRoute exact path="/verify" component={Verification} />
          <PublicRoute exact path="/forgot" component={ForgotPassword} />
          <PublicRoute exact path="/forgot/:token" component={ForgotPassword} />
          <PrivateRoute exact path="/reset" component={ResetPassword} />
          <PublicRoute exact path="/timeout" component={TimeoutPage} />
          <PrivateRoute exact path="/landing" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
