import React, { Component, useEffect, useState } from "react";
import "../App.css";

export default function (props) {
  const [isStatsMode, setIsStatsMode] = useState(false);
  const [date, setDate] = useState("");
  const [dishList, setDishList] = useState([
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
  const [stats, setStats] = useState({
    sum_calories: 4.6000000000000005,
    sum_fats: 0.0,
    sum_carbs: 0.6000000000000001,
    sum_protein: 0.2,
  });

  useEffect(() => {
    getDishList();
  }, []);

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

  const getDishList = () => {
    setIsStatsMode(false);
    // Загрузка пользователей
    fetch(`/dishes?user=${props.user}`)
      .then((res) => {
        console.log("getDishList res", res);
        return res.json();
      })
      .then((data) => {
        console.log("getDishList data", data);
        setDishList(data);
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };

  const calculateDay = () => {
    setIsStatsMode(true);
    console.log("calculateDay", "/users", date);

    fetch(`/dishes/calculate?user=${props.user}&date=${date}`)
      .then((res) => {
        console.log("calculateDay res", res);
        return res.json();
      })
      .then((data) => {
        console.log("calculateDay data", data);
        // setStats(data);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  return (
    <>
      <h1>Calculator</h1>
      <input
        className="foodInput"
        type="text"
        value={date}
        placeholder="Date: YYYY-MM-DD"
        onChange={(e) => {
          console.log("event", e.target.value);
          setDate(e.target.value);
        }}
      />
      <button
        className="foodBtn"
        onClick={calculateDay}
        style={{ marginRight: "16px" }}
      >
        Calculate
      </button>

      <button className="foodBtn" onClick={getDishList}>
        Show dish list
      </button>

      {/* Nutrition Calculated Stats */}
      {isStatsMode && (
        <div>
          <h2>Calories: {stats.sum_calories}</h2>
          <h2>Carbs: {stats.sum_carbs}</h2>
          <h2>Fats: {stats.sum_fats}</h2>
          <h2>Protein: {stats.sum_protein}</h2>
        </div>
      )}

      {/* Dish List */}
      {!isStatsMode && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            margin: "auto",
          }}
        >
          {dishList.map((dish) => {
            return (
              <div className="foodCards">
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
      )}
    </>
  );
}
