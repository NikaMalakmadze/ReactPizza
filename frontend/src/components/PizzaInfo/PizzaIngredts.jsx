import { useSelector } from "react-redux";
import PizzaIngredtsSkeleton from "./Skeletons/PizzaIngrendtsSkeleton";

const PizzaIngrendts = () => {
  const { status, pizza } = useSelector((state) => state.currentPizza);

  return status === "pending" || !status ? (
    <PizzaIngredtsSkeleton />
  ) : (
    <div className="pizza__ingredients-container">
      <h4 className="pizza__ingredients-title">🥘 ინგრედიენტები</h4>
      <div className="pizza__ingredients-wrapper">
        {pizza.ingredients.map((ing, id) => (
          <div className="pizza__ingredient" key={`ingredientN${id}`}>
            <div className="pizza__ingredient-dot"></div>
            <h6 className="pizza__ingredient-title">{ing}</h6>
          </div>
        ))}
      </div>
      <p className="pizza__ingredients-warn">
        <span className="pizza__ingredients-warn-text">
          ინგრედიენტები შეიძლება ოდნავ განსხვავდებოდეს პიცის ზომის მიხედვით.
        </span>
      </p>
    </div>
  );
};

export default PizzaIngrendts;
