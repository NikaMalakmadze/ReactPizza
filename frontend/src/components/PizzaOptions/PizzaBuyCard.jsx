import { useDispatch, useSelector } from "react-redux";

import PizzaCounterSkeleton from "./Skeletons/PizzaCounterSkeleton";
import PizzaPricesSkeleton from "./Skeletons/PizzaPricesSkeleton";
import { setPizzaAmount } from "../../redux/slices/pizzaSlice";
import PizzaAddSkeleton from "./Skeletons/PizzaAddSkeleton";
import { addItem } from "../../redux/slices/cartSlice";
import {
  pizzaSizes,
  pizzaTypesNames,
  sizePrices,
  typePrices,
} from "../PizzaBlock";

const PizzaBuyCard = () => {
  const dispatch = useDispatch();
  const { status, pizza, pizzaSize, pizzaType, count } = useSelector(
    (state) => state.currentPizza
  );

  const addItemToCart = () => {
    const pizzaPrice =
      pizza.price +
      sizePrices[pizzaSize] +
      typePrices[pizzaTypesNames[pizzaType]];

    const item = {
      id: pizza.id,
      title: pizza.title,
      image_file: pizza.image_file,
      type: pizzaType,
      size: pizzaSizes.indexOf(pizzaSize),
      slug: pizza.slug,
      discount: pizza.discount_percent,
      pizzaPrice,
      count,
    };
    dispatch(addItem(item));
  };

  const discountPrice = (
    (pizza.price +
      sizePrices[pizzaSize] +
      typePrices[pizzaTypesNames[pizzaType]]) *
    (1 - pizza["discount_percent"] / 100) *
    count
  ).toFixed(2);

  return (
    <div className="pizza__options-card pizza__options-buy">
      <div className="pizza__options-buy-info">
        {status === "pending" || !status ? (
          <>
            <PizzaPricesSkeleton />
            <PizzaCounterSkeleton />
          </>
        ) : (
          <>
            <div
              className={
                "pizza__options-buy-price-wrapper " +
                (discountPrice.toString().length > 5
                  ? "pizza__options-buy-price-wrapper--vertical"
                  : "")
              }
            >
              {pizza.discount_percent === 0 ? (
                <span className="pizza__options-buy-price">
                  {(
                    count *
                    (pizza.price +
                      sizePrices[pizzaSize] +
                      typePrices[pizzaTypesNames[pizzaType]])
                  ).toFixed(2)}
                  ₾
                </span>
              ) : (
                <>
                  <span className="pizza__options-buy-price">
                    {discountPrice}₾
                  </span>
                  <span className="pizza__options-buy-price pizza__options-buy-price--old">
                    {(
                      count *
                      (pizza.price +
                        sizePrices[pizzaSize] +
                        typePrices[pizzaTypesNames[pizzaType]])
                    ).toFixed(2)}
                    ₾
                  </span>
                </>
              )}
            </div>
            <div className="pizza__options-buy-counter">
              <button
                className={
                  "pizza__options-buy-minus " +
                  (count === 1 ? "pizza__options-buy-minus--disabled" : "")
                }
                onClick={() => {
                  dispatch(setPizzaAmount("decrease"));
                }}
              >
                <span className="pizza__options-buy-icon">−</span>
              </button>
              <span className="pizza__options-buy-count">{count}</span>
              <button
                className="pizza__options-buy-plus"
                onClick={() => {
                  dispatch(setPizzaAmount("increase"));
                }}
              >
                <span className="pizza__options-buy-icon">+</span>
              </button>
            </div>
          </>
        )}
      </div>
      {status === "pending" || !status ? (
        <PizzaAddSkeleton />
      ) : (
        <button className="pizza__options-buy-btn" onClick={addItemToCart}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>დამატება</span>
        </button>
      )}
    </div>
  );
};

export default PizzaBuyCard;
