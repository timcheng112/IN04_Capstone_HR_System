import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
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
import TrainingPage from "./pages/Training/index"

import EmployeeChart from "./pages/OrgChart/ViewOrgChart/viewOrgChart";
import EmployeeList from "./pages/AccountManagement/ViewEmployeeList/viewEmployeeList";
import OnboardingHrPage from "./pages/Onboarding/indexHR";
import OnboardingPage from "./pages/Onboarding/index";
import OffboardingHrPage from "./pages/Offboarding/indexHr";
import OffboardingPage from "./pages/Offboarding/index";
import TrainingHRPage from "./pages/Training/indexAll";
import ModulePage from "./pages/Module";
import AdminPage from "./pages/AdminPage";

import JobRequestPage from "./pages/JobRequest/index";
import JobRequestDetailPage from "./pages/JobRequest/RequestDetail";
import NewJobRequestPage from "./pages/JobRequest/NewRequest";
import JobRequestHrPage from "./pages/JobRequest/indexHR";
import JobPostPage from "./pages/JobPost/indexHR";
import VideoPage from "./pages/Video";
import AllTrainingPage from "./pages/Training/indexAll";
import AllVideosPage from "./pages/Video/indexAll";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/forgot" component={ForgotPasswordPage} />
          <PublicRoute
            exact
            path="/forgot/:token"
            component={ForgotPasswordPage}
          />
          <PublicRoute exact path="/verify" component={VerificationPage} />
          <PublicRoute
            exact
            path="/verify/:token"
            component={VerificationPage}
          />
          <PrivateRoute exact path="/reset" component={ResetPasswordPage} />
          <PublicRoute exact path="/timeout" component={Timeout} />
          <PrivateRoute exact path="/onboarding" component={OnboardingHrPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage}/>
          <PrivateRoute exact path="/viewOrg" component={ViewOrganisation}/>
          <PrivateRoute exact path="/updateProfile" component={UpdateProfile}/>
          {/* //          <PublicRoute exact path="/updateProfile" component={UpdateProfile}/> */}
          {/* //          <PublicRoute exact path="/viewOrgChart" component={EmployeeChart} /> */}
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/viewOrgChart" component={EmployeeChart}/>
          <PrivateRoute exact path="/viewTeam/:teamId" component={ViewTeam}/>
          <PrivateRoute exact path="/viewDept/:deptId" component={ViewDepartment}/>
          <PrivateRoute exact path="/offboarding" component={OffboardingPage}/>
          {/* <ViewTeam/> */}
          <PrivateRoute exact path="/admin" component={AdminPage}/> 
          <PrivateRoute exact path="/admin/onboarding" component={OnboardingPage} />
          <PrivateRoute exact path="/admin/onboardinghr" component={OnboardingHrPage} />
          <PrivateRoute exact path="/admin/offboarding" component={OffboardingPage} />
          <PrivateRoute exact path="/admin/offboardinghr" component={OffboardingHrPage} />
          <PrivateRoute exact path="/mytraining" component={TrainingPage} />
          <PrivateRoute exact path="/training" component={AllTrainingPage} />  
          <PrivateRoute exact path="/module/:moduleId" component={ModulePage} />     
          <PrivateRoute exact path="/module/:moduleId/video/:videoId" component={VideoPage} />  
          <PrivateRoute exact path="/video" component={AllVideosPage} />  

          <PublicRoute exact path="/hiring/jobrequest" component={JobRequestPage} />
          <PublicRoute exact path="/hiring/jobrequestdetail" component={JobRequestDetailPage} />
          <PublicRoute exact path="/hiring/newjobrequest" component={NewJobRequestPage} />
          <PublicRoute exact path="/hiring/jobrequesthr" component={JobRequestHrPage} />
          <PublicRoute exact path="/hiring/jobpost" component={JobPostPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
