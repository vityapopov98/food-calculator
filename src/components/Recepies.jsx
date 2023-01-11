import React, { Component, useEffect, useState } from "react";
import "../App.css";

export default function (props) {
  const [dishes, setDishes] = useState([
    {
      dish_name: "пицца",
      product_weight: {
        помидоры: 0.2,
        огурцы: 0.2,
      },
      date: "2016-11-09T10:30:00",
      sum_calories: 4.6000000000000005,
      sum_fats: 0.0,
      sum_carbs: 0.6000000000000001,
      sum_protein: 0.2,
    },
  ]);

  const [createDishName, setCreateDishName] = useState("");
  const [date, setDate] = useState("");
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

  const renderProductWeight = (productWeight) => {
    const pwJSX = [];
    for (const key in productWeight) {
      if (Object.hasOwnProperty.call(productWeight, key)) {
        const element = productWeight[key];
        console.log("pwpwppw", key, element);
        pwJSX.push(
          <p>
            {key}: {element}
          </p>
        );
      }
    }
    return pwJSX;
  };

  useEffect(() => {
    //Загрузка из Бд
    fetch("/dishes")
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
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("/products")
      .then((res) => {
        console.log("getProducts res", res);
        return res.json();
      })
      .then((data) => {
        console.log("getProducts data", data);
        //setAvailableProducts(data)
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  const saveDish = () => {
    alert("saving");

    const productWeight = {};
    dishProducts.forEach((dp) => {
      productWeight[dp.name] = dp.weight;
    });

    const dataToSave = {
      name: createDishName,
      data: date,
      user: props.user,
      product_weight: productWeight,
    };

    console.log("saveProduct", "/products", dataToSave);

    fetch("/products", {
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
          value={date}
          placeholder="Date"
          onChange={(e) => {
            console.log("event", e.target.value);
            setDate(e.target.value);
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
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          margin: "auto",
        }}
      >
        {dishes.map((dish) => {
          return (
            <div className="foodCards">
              {/* <h3 className="foodCards-header">{dish.name}</h3> */}
              {/* {JSON.stringify(prod)} */}
              {/* <p>
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
              </p> */}
              <h3 className="foodCards-header">{dish.dish_name}</h3>
              <p>{dish.date}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    borderRight: "1px solid #e4e7ed",
                    marginRight: "16px",
                  }}
                >
                  {renderProductWeight(dish.product_weight)}
                </div>
                <div style={{ width: "50%" }}>
                  <p>
                    Calories:{" "}
                    <span className="foodCards-description">
                      {dish.sum_calories}
                    </span>
                  </p>
                  <p>
                    Fats:{" "}
                    <span className="foodCards-description">
                      {dish.sum_fats}
                    </span>
                  </p>
                  <p>
                    Carbs:{" "}
                    <span className="foodCards-description">
                      {dish.sum_carbs}
                    </span>
                  </p>
                  <p>
                    Protein:{" "}
                    <span className="foodCards-description">
                      {dish.sum_protein}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
