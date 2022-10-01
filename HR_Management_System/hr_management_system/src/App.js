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
import ResetPasswordPage from "./pages/ResetPassword";
//testing shi han's pages
import ViewTeam from "./pages/OrgChart/ViewTeam/viewTeam";
import ViewDepartment from "./pages/OrgChart/ViewDepartment/viewDepartment";
import ViewOrganisation from "./pages/OrgChart/ViewOrganisation/viewOrganisation";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfile from "./pages/UpdateProfile";
import HomePage from "./pages/Home";

import EmployeeChart from "./pages/OrgChart/ViewOrgChart/viewOrgChart";
import EmployeeList from "./pages/AccountManagement/ViewEmployeeList/viewEmployeeList";

function App() {
  return (
    // <BrowserRouter>
    //   <div className="App">
    //     <Switch>
    //       <PublicRoute exact path="/" component={LoginPage} />
    //       <PrivateRoute exact path="/register" component={RegisterPage} />
    //       <PublicRoute exact path="/forgot" component={ForgotPasswordPage} />
    //       <PublicRoute
    //         exact
    //         path="/forgot/:token"
    //         component={ForgotPasswordPage}
    //       />
    //       <PrivateRoute exact path="/verify" component={VerificationPage} />
    //       <PrivateRoute
    //         exact
    //         path="/verify/:token"
    //         component={VerificationPage}
    //       />
    //       <PrivateRoute exact path="/reset" component={ResetPasswordPage} />
    //       <PublicRoute exact path="/timeout" component={Timeout} />
    //       <PublicRoute exact path="/onboarding" component={OnboardingHrPage} />
    //       <PrivateRoute exact path="/profile" component={ProfilePage}/>
    //       <PrivateRoute exact path="/viewOrg" component={ViewOrganisation}/>
    //       <PrivateRoute exact path="/updateProfile" component={UpdateProfile}/>
    //       {/* //          <PublicRoute exact path="/updateProfile" component={UpdateProfile}/> */}
    //       {/* //          <PublicRoute exact path="/viewOrgChart" component={EmployeeChart} /> */}
    //       <PrivateRoute exact path="/home" component={HomePage} />
    //       <PrivateRoute exact path="/viewOrgChart" component={EmployeeChart}/>
    //       <PrivateRoute exact path="/viewTeam" component={ViewTeam}/>
    //       <PrivateRoute exact path="/viewDept" component={ViewDepartment}/>
    //       <PublicRoute exact path="/offboarding" component={OffboardingHrPage}/>
    //       {/* <ViewTeam/> */}
    //     </Switch>
    //   </div>
    // </BrowserRouter>

    //    <ViewTeam/>
    // <ViewDepartment />
    <ViewOrganisation />
    //    <EmployeeChart />
    //    <EmployeeList/>
    //    <ProfilePage/>
  );
}

export default App;
