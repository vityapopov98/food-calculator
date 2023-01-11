import React, { Component, useEffect, useState } from "react";
import "../App.css";

export default function (props) {
  const [users, setUsers] = useState([{ name: "testuser" }]);
  const [createdUserName, setCreatedUserName] = useState("");

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
        // setUsers(data)
        props.setAllUsers([{ name: "testuser" }]);
      })
      .catch((e) => {
        console.log("error:", e);
        setUsers([]);
        props.setAllUsers([{ name: "testuser" }]);
      });
  };

  const saveUser = () => {
    console.log("saveUser", "/users", {
      name: createdUserName,
    });

    fetch("/users", {
      method: "POST",
      body: JSON.stringify({ name: createdUserName }),
    })
      .then((res) => {
        console.log("res", res);
        getUsers();
      })
      .catch((e) => {
        console.log("error: ", e);
        getUsers();
      });
  };

  return (
    <>
      <h1>Users</h1>
      <input
        className="foodInput"
        type="text"
        value={createdUserName}
        placeholder="User name"
        onChange={(e) => {
          console.log("event", e.target.value);
          setCreatedUserName(e.target.value);
        }}
      />
      <button className="foodBtn" onClick={saveUser}>
        Add
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "auto",
        }}
      >
        {users.map((user) => {
          return (
            <div className="foodCards">
              <h3 className="foodCards-header">{user.name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
