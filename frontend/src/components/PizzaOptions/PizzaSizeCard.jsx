import { useDispatch, useSelector } from "react-redux";

import PizzaSizeSkeleton from "./Skeletons/PizzaSizeSkeleton";
import { sizePrices } from "../PizzaBlock";
import { setPizzaSize } from "../../redux/slices/pizzaSlice";

const sizeName = {
  26: "პატარა",
  30: "საშუალო",
  40: "დიდი",
};

const PizzaSizeCard = () => {
  const dispatch = useDispatch();
  const { status, pizza, pizzaSize } = useSelector(
    (state) => state.currentPizza
  );

  return (
    <div className="pizza__options-card pizza__options-size">
      <h5 className="pizza__options-card-title">ზომა</h5>
      <div className="pizza__options-sizes-container">
        {status === "pending" || !status ? (
          <PizzaSizeSkeleton />
        ) : (
          <>
            {pizza["pizza_sizes"].map((size, i) => (
              <div
                className={
                  "pizza__options-size-wrapper " +
                  (pizzaSize === size
                    ? "pizza__options-size-wrapper--active"
                    : "")
                }
                onClick={() => dispatch(setPizzaSize(size))}
                key={`PizzaSize_${size}_id_${i}`}
              >
                <div className="pizza__options-size-info">
                  <span className="pizza__options-size-value">{size}სმ.</span>
                  <span className="pizza__options-size-name">
                    {sizeName[size]}
                  </span>
                </div>
                <span className="pizza__options-size-price">
                  {pizza.price + sizePrices[size]}₾
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PizzaSizeCard;
