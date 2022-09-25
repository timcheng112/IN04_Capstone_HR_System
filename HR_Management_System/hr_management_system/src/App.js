import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import OnboardingHr from "./pages/OnboardingHr";

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
    <OnboardingHr />
  );
}

export default App;
