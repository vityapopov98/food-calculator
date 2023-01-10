import React, { Component, useEffect, useState } from "react";
import "../App.css";

export default function (props) {
  const [dishes, setDishes] = useState([
    {
      name: "test",
      products: [
        {
          name: "test",
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
      ],
      date: "дата время",
      user: "testname",
      product_weight: [
        { "названи продукта": "вес продукта" },
        { "название продукта": "вес продукта" },
        { "название продукта": "вес продукта" },
      ],
    },
  ]);

  const [createDishName, setCreateDishName] = useState("");
  const [user, setUser] = useState("");
  const [dishProducts, setDishProducts] = useState([]);

  const [availableProducts, setAvailableProducts] = useState([
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

  useEffect(() => {
    //Загрузка из Бд
    fetch("/cc/dishes")
      .then((res) => {
        console.log("GET Recepies res", res);
        return res.json();
      })
      .then((data) => {
        //Загружаем данные с data в state
        console.log("GET Recepies data", data);
        // setDishes(data)
      })
      .catch((e) => {
        console.log("error:", e);
      });
  }, []);

  const saveDish = () => {
    alert("saving");

    const productWeight = {};
    dishProducts.forEach((dp) => {
      productWeight[dp.name] = dp.weight;
    });

    const dataToSave = {
      name: createDishName,
      data: new Date(),
      user: user,
      product_weight: productWeight,
    };

    console.log("saveProduct", "/cc/products", dataToSave);

    fetch("/cc/products", {
      method: "POST",
      body: JSON.stringify(dataToSave),
    })
      .then((res) => {
        console.log("saveDish res", res);
        return res.json();
      })
      .then((data) => {
        console.log("saveDish data", data);
        //setDishes(res)
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  return (
    <>
      <h1>Dishes</h1>
      {/* Форма */}
      <div>
        <input
          className="foodInput"
          type="text"
          value={createDishName}
          placeholder="Name"
          onChange={(e) => {
            console.log("event", e.target.value);
            setCreateDishName(e.target.value);
          }}
        />

        <input
          className="foodInput"
          type="text"
          value={user}
          placeholder="User"
          onChange={(e) => {
            console.log("event", e.target.value);
            setUser(e.target.value);
          }}
        />

        <div>
          <p>Dish products:</p>
          {dishProducts.map((dp, index) => {
            return (
              <>
                <select
                  className="foodInput"
                  onChange={(e) => {
                    console.log("avp chsnged", e.target.value);
                    const newName = e.target.value;
                    const newArray = [...dishProducts];
                    newArray[index].name = newName;
                    setDishProducts(newArray);
                  }}
                >
                  {availableProducts.map((avp) => {
                    return <option value={avp.name}>{avp.name}</option>;
                  })}
                </select>
                <input
                  className="foodInput"
                  type="text"
                  value={dp.weight}
                  placeholder="product weight"
                  onChange={(e) => {
                    console.log("event", e.target.value);
                    const newName = e.target.value;
                    const newArray = [...dishProducts];
                    newArray[index].weight = newName;
                    setDishProducts(newArray);
                  }}
                />
                <button
                  className="foodBtn"
                  onClick={() => {
                    const newArray = [...dishProducts];
                    newArray.splice(index, 1);
                    setDishProducts(newArray);
                  }}
                >
                  x
                </button>
              </>
            );
          })}
        </div>

        <button
          className="foodBtn"
          onClick={() => {
            const newArray = [
              ...dishProducts,
              { name: availableProducts[0].name || "", weight: "" },
            ];
            setDishProducts(newArray);
          }}
        >
          +
        </button>

        <button
          className="foodBtn"
          onClick={saveDish}
          style={{ marginLeft: "16px" }}
        >
          Add Dish
        </button>
      </div>
      {/* Список */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "auto",
        }}
      >
        {dishes.map((prod) => {
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
