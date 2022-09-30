import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";

import OnboardingHrPage from "./pages/OnboardingHr";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Timeout from "./pages/Timeout";
import RegisterPage from "./pages/Register";
import VerificationPage from "./pages/Verification";
import ForgotPasswordPage from "./pages/ForgotPassword";
import OnboardingHr from "./pages/OnboardingHr";

//testing shi han's pages
import ViewTeam from "./pages/OrgChart/ViewTeam/viewTeam";
import ViewDepartment from "./pages/OrgChart/ViewDepartment/viewDepartment";
import ViewOrganisation from "./pages/OrgChart/ViewOrganisation/viewOrganisation";
import ProfilePage from './pages/ProfilePage';
import UpdateProfile from './pages/UpdateProfile';

import EmployeeChart from "./pages/OrgChart/ViewOrgChart/viewOrgChart";


function App() {
  return (
//    <BrowserRouter>
//      <div className="App">
//        <Switch>
//          <PublicRoute exact path="/" component={LoginPage} />
//          <PublicRoute exact path="/register" component={RegisterPage} />
//          <PublicRoute exact path="/forgot" component={ForgotPasswordPage} />
//          <PublicRoute exact path="/verify" component={VerificationPage} />
//          <PublicRoute exact path="/verify/:token" component={VerificationPage} />
//          <PublicRoute exact path="/test" component={Timeout} />
//          <PrivateRoute exact path="/onboarding" component={OnboardingHrPage} />
//          <PublicRoute exact path="/profile" component={ProfilePage}/>
//          <PublicRoute exact path="/viewOrg" component={ViewOrganisation}/>
//          <PublicRoute exact path="/updateProfile" component={UpdateProfile}/>

//
//        </Switch>
//      </div>
//    </BrowserRouter>
//    <OnboardingHr />
    <ViewTeam/>
//    <ViewDepartment />
 //   <ViewOrganisation />
        <EmployeeChart />


  );
}

export default App;
