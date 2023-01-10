import React, { Component, useEffect, useState } from "react";
import "../App.css";

export default function (props) {
  const [products, setProducts] = useState([
    {
      name: "test",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
    {
      name: "test2",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
    {
      name: "test",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
    {
      name: "test2",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
    {
      name: "test",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
    {
      name: "test2",
      calories: 4444,
      fats: 5555,
      carbs: 533535,
      protein: 4444,
    },
  ]);

  const [createProductName, setCreateProduct] = useState("");
  const [createProductCalories, setCreateCalories] = useState("");
  const [createProductFats, setCreateFats] = useState("");
  const [createProductCarbs, setCreateCarbs] = useState("");
  const [createProductProtein, setCreateProtein] = useState("");

  useEffect(() => {
    // Загрузка из Бд
    fetch("/cc/products")
      .then((res) => {
        console.log("GET Products res", res);
        return res.json();
      })
      .then((data) => {
        //Загружаем данные с data в stat
        console.log("GET Products data", data);
        // setProducts(data);
      })
      .catch((e) => {
        console.log("error:", e);
      });
  }, []);

  const saveProduct = () => {
    alert("saving");

    const dataToSave = {
      name: createProductName,
      calories: createProductCalories,
      fats: createProductFats,
      carbs: createProductCarbs,
      protein: createProductProtein,
    };
    console.log("saveProduct", "/cc/products", dataToSave);

    fetch("/cc/products", {
      method: "POST",
      body: JSON.stringify(dataToSave),
    })
      .then((res) => {
        console.log("saveProduct res", res);
        return res.json();
      })
      .then((data) => {
        console.log("saveProduct data", data);
        //setDishes(res)
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  return (
    <>
      <h1>Products</h1>
      {/* Форма */}
      <div>
        <input
          className="foodInput"
          type="text"
          value={createProductName}
          placeholder="Name"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateProduct(e.target.value);
          }}
        />

        <input
          className="foodInput"
          type="text"
          value={createProductCalories}
          placeholder="Calories"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateCalories(e.target.value);
          }}
        />

        <input
          className="foodInput"
          type="text"
          value={createProductFats}
          placeholder="Fats"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateFats(e.target.value);
          }}
        />

        <input
          className="foodInput"
          type="text"
          value={createProductCarbs}
          placeholder="Carbs"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateCarbs(e.target.value);
          }}
        />

        <input
          className="foodInput"
          type="text"
          value={createProductProtein}
          placeholder="Protein"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateProtein(e.target.value);
          }}
        />

        <button className="foodBtn" onClick={saveProduct}>
          Add
        </button>
      </div>
      {/* Список */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          margin: "auto",
        }}
      >
        {products.map((prod) => {
          return (
            <div className="foodCards">
              <h3 className="foodCards-header">{prod.name}</h3>
              {/* {JSON.stringify(prod)} */}
              <p>
                {" "}
                <span className="foodCards-description">Calories:</span>{" "}
                {prod.calories}
              </p>
              <p>
                <span className="foodCards-description">Carbs:</span>{" "}
                {prod.carbs}
              </p>
              <p>
                <span className="foodCards-description">Fats:</span> {prod.fats}
              </p>
              <p>
                <span className="foodCards-description">Protein:</span>{" "}
                {prod.protein}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
