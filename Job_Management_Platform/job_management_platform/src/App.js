import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TimeoutPage from "./pages/Timeout";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BlacklistPage from "./pages/Blacklisted";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfile from "./pages/UpdatePage";
import JobPostingPage from "./pages/JobPosting";
import JobApplicationPage from "./pages/JobPosting/apply";
import FavouriteJobPage from "./pages/JobPosting/favourite";
import JobDetailPage from "./pages/JobPosting/jobDetail";
import JobOfferPage from "./pages/JobPosting/jobOffer";
import Home from "./pages/Home";
import AllNotificationPage from "./pages/NotificationPage/AllNotificationPage";
import AddNotification from "./pages/NotificationPage/AddNotification";


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
          <PublicRoute exact path="/reactivation" component={BlacklistPage} />
          {/* <PrivateRoute exact path="/landing" component={LandingPage} /> */}
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/updateProfile" component={UpdateProfile} />
          <PrivateRoute exact path="/home" component={Home} />
          
          <PrivateRoute exact path="/jobposting" component={JobPostingPage} />
          <PrivateRoute exact path="/myapplication" component={JobApplicationPage} />
          <PrivateRoute exact path="/myfavourite" component={FavouriteJobPage} />
          <PrivateRoute exact path="/jobdetail" component={JobDetailPage} />
          <PrivateRoute exact path="/myoffer" component={JobDetailPage} />

          <PrivateRoute exact path="/AllNotifications" component={AllNotificationPage}/>
          <PrivateRoute exact path="/AddNotification" component={AddNotification}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
