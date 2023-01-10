import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products";
import Recepies from "./components/Recepies";
import User from "./components/User";

function App() {
  return (
    <div className="App container">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Products />
      <Recepies />
      <User />
    </div>
  );
}

export default App;
