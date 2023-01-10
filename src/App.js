import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products";
import Recepies from "./components/Recepies";
import User from "./components/User";
import { useState } from "react";

function App() {
  const [currentTab, setCurrentTab] = useState("dish"); // products | users

  return (
    <div className="App container">
      <button
        style={{ paddingLeft: "0px" }}
        className="navButtons"
        onClick={() => {
          setCurrentTab("dish");
        }}
      >
        Dish
      </button>
      <button
        style={{ margin: "16px" }}
        className="navButtons"
        onClick={() => {
          setCurrentTab("products");
        }}
      >
        Products
      </button>
      <button
        style={{ margin: "16px" }}
        className="navButtons"
        onClick={() => {
          setCurrentTab("users");
        }}
      >
        Users
      </button>

      {currentTab === "dish" ? (
        <Recepies />
      ) : currentTab === "products" ? (
        <Products />
      ) : (
        <User />
      )}
    </div>
  );
}

export default App;
