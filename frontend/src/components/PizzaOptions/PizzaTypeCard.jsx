import { useDispatch, useSelector } from "react-redux";
import PizzaTypeSkeleton from "./Skeletons/PizzaTypeSkeleton";
import { pizzaTypesNames } from "../PizzaBlock";
import { setPizzaType } from "../../redux/slices/pizzaSlice";

const PizzaTypeCard = () => {
  const dispatch = useDispatch();
  const { status, pizza, pizzaType } = useSelector(
    (state) => state.currentPizza
  );

  return (
    <div className="pizza__options-card pizza__options-type">
      <h5 className="pizza__options-card-title">ცომის ტიპი</h5>
      {status === "pending" || !status ? (
        <PizzaTypeSkeleton />
      ) : (
        <div className="pizza__options-type-wrapper">
          {pizza["pizza_types"].map((type, i) => (
            <div
              className={
                "pizza__options-type-select " +
                (pizzaType === i ? "pizza__options-type-select--active" : "")
              }
              onClick={() => dispatch(setPizzaType(i))}
              key={`PizzaType_${type}_id_${i}`}
            >
              <span className="pizza__options-type-select-text">
                {pizzaTypesNames[type]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PizzaTypeCard;
