import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import qs from "qs";

import {
  clearCurrentPizza,
  fetchPizza,
  setCurrentTab,
  setPizzaSize,
  setPizzaType,
} from "../redux/slices/pizzaSlice";
import PizzaInfo from "./../components/PizzaInfo/index";
import PizzaOptions from "../components/PizzaOptions";

const Pizza = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTab, pizzaType, pizzaSize } = useSelector(
    (state) => state.currentPizza
  );

  let params;

  const { slug } = useParams();
  const isFirstRender = React.useRef(true);

  const getPizza = () => {
    try {
      dispatch(fetchPizza({ slug, params }));
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      params = qs.parse(window.location.search.substring(1));

      try {
        dispatch(setCurrentTab(Number(params.currentTab)));
        dispatch(setPizzaType(Number(params.pizzaType)));
        dispatch(setPizzaSize(Number(params.pizzaSize)));
      } catch (e) {
        dispatch(setCurrentTab(1));
      }

      isFirstRender.current = true;
    }
  }, []);

  React.useEffect(() => {
    getPizza();
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const queryString = qs.stringify({ currentTab, pizzaType, pizzaSize });
    navigate(`?${queryString}`, { replace: true });
  }, [currentTab, pizzaType, pizzaSize]);

  React.useEffect(() => {
    return () => {
      dispatch(clearCurrentPizza());
    };
  }, []);

  return (
    <div className="pizza__container">
      <PizzaInfo />
      <PizzaOptions />
    </div>
  );
};

export default Pizza;
