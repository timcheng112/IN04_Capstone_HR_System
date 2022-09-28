import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import OnboardingHr from "./pages/OnboardingHr";
import ViewTeam from "./pages/OrgChart/ViewTeam/viewTeam";
import ViewDepartment from "./pages/OrgChart/ViewDepartment/viewDepartment";
import ViewOrganisation from "./pages/OrgChart/ViewOrganisation/viewOrganisation";

function App() {
  return (
    // <BrowserRouter>
    //   {/* // <h1 className="text-3xl font-bold underline">
    // //   Hello HR Management System!
    // // </h1> */}
    //   <div className="App">
    //     <Switch>
    //       <Route exact path="/" component={LoginPage} />
    //     </Switch>
    //   </div>
    // </BrowserRouter>
//    <OnboardingHr />
//    <ViewTeam/>
//    <ViewDepartment />
    <ViewOrganisation />
  );
}

export default App;
