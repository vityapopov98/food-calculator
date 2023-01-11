import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products";
import Recepies from "./components/Recepies";
import User from "./components/User";
import Calc from "./components/Calc";
import { useEffect, useState } from "react";

function App() {
  const [currentTab, setCurrentTab] = useState("products"); // products | users
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    // Загрузка пользователей
    fetch("/users")
      .then((res) => {
        console.log("getUsers res", res);
        return res.json();
      })
      .then((data) => {
        console.log("getUsers data", data);
        setAllUsers([{ name: "testuser" }]);
      })
      .catch((e) => {
        console.log("error:", e);
        setAllUsers([
          { name: "testuser" },
          { name: "testuser2" },
          { name: "testuser3" },
        ]);
        setCurrentUser("testuser");
      });
  };

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
      <button
        style={{ margin: "16px" }}
        className="navButtons"
        onClick={() => {
          setCurrentTab("calc");
        }}
      >
        Calculator
      </button>

      <select
        className="headerSelect"
        onChange={(e) => {
          console.log("avp chsnged", e.target.value);
          setCurrentUser(e.target.value);
        }}
      >
        {allUsers.map((au) => {
          return <option value={au.name}>{au.name}</option>;
        })}
      </select>

      {currentTab === "dish" ? (
        <Recepies user={currentUser} />
      ) : currentTab === "products" ? (
        <Products />
      ) : currentTab === "users" ? (
        <User />
      ) : (
        <Calc user={currentUser} />
      )}
    </div>
  );
}

export default App;
