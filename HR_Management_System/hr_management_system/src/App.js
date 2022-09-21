import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route ,Switch} from 'react-router-dom'
import LoginPage from './pages/Login'

function App() {
  return (
    <BrowserRouter>
    {/* // <h1 className="text-3xl font-bold underline">
    //   Hello HR Management System!
    // </h1> */}
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
