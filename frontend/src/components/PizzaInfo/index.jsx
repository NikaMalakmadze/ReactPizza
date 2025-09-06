import { useDispatch, useSelector } from "react-redux";

import PizzaStatsSkeleton from "./Skeletons/PizzaStatsSkeleton";
import PizzaImageSkeleton from "./Skeletons/PizzaImageSkeleton";
import { setCurrentTab } from "../../redux/slices/pizzaSlice";
import PizzaNutrition from "./PizzaNutrition";
import PizzaIngrendts from "./PizzaIngredts";
import styles from "./PizzaInfo.module.scss";
import PizzaBadges from "./PizzaBadges";
import PizzaStats from "./PizzaStats";
import PizzaDesc from "./PizzaDesc";
import React from "react";

const tabs = [
  { name: "დახასიათება", id: 1 },
  { name: "შემადგენლობა", id: 2 },
  { name: "კვებითი ღირებულება", id: 3 },
];

const PizzaInfo = () => {
  const dispatch = useDispatch();
  const { pizza, currentTab, status } = useSelector(
    (state) => state.currentPizza
  );
  const pizzaContentRef = React.useRef();

  return (
    <div className={styles.root}>
      <div className="pizza__info">
        <div className="pizza__img-wrapper">
          {status === "pending" || !status ? (
            <PizzaImageSkeleton />
          ) : (
            <>
              <img
                className="pizza__img"
                src={pizza.image_file}
                alt={pizza.title}
              />
              <PizzaBadges pizza={pizza} />
            </>
          )}
        </div>
        <div className="pizza__content" ref={pizzaContentRef}>
          {status === "pending" || !status ? (
            <PizzaStatsSkeleton />
          ) : (
            <PizzaStats pizza={pizza} />
          )}
          <div className="pizza__tabs-wrapper">
            <div className="pizza__tabs-container">
              {tabs.map((tab) => (
                <div
                  className={
                    "pizza__tab " +
                    (currentTab === tab.id ? "pizza__tab--active" : "")
                  }
                  key={`tabNomer${tab.id}`}
                >
                  <div
                    className="pizza__tab-text"
                    onClick={() => dispatch(setCurrentTab(tab.id))}
                  >
                    {tab.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pizza__tabs-content-container">
            {currentTab === 1 && <PizzaDesc />}
            {currentTab === 2 && <PizzaIngrendts />}
            {currentTab === 3 && <PizzaNutrition pizza={pizza} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaInfo;
