import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import OnboardingHrPage from "./pages/Onboarding/index";
import OffboardingHrPage from "./pages/Offboarding/indexHr";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Timeout from "./pages/Timeout";
import RegisterPage from "./pages/Register";
import VerificationPage from "./pages/Verification";
import ForgotPasswordPage from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/forgot" component={ForgotPasswordPage} />
          <PublicRoute exact path="/verify" component={VerificationPage} />
          <PublicRoute
            exact
            path="/verify/:token"
            component={VerificationPage}
          />
          <PublicRoute exact path="/test" component={Timeout} />
          <PublicRoute exact path="/onboarding" component={OnboardingHrPage} />
          <PublicRoute
            exact
            path="/offboarding"
            component={OffboardingHrPage}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
