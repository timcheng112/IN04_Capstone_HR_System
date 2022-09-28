import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import OnboardingHrPage from "./pages/OnboardingHr";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Timeout from "./pages/Timeout";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/test" component={Timeout} />
          <PrivateRoute exact path="/onboarding" component={OnboardingHrPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
