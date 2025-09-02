import { useSelector } from "react-redux";
import PizzaNutritionSkeleton from "./Skeletons/PizzaNutritionSkeleton";
import { pizzaSizes } from "../PizzaBlock";

const PizzaNutrition = ({ pizza }) => {
  const { status, pizzaSize, count } = useSelector(
    (state) => state.currentPizza
  );

  if (status === "fulfiled") {
    if (Object.keys(pizza) && !Object.keys(pizza["nutrition_info"]).length) {
      return "No Info";
    }
  }

  return status === "pending" || !status ? (
    <PizzaNutritionSkeleton />
  ) : (
    <div className="pizza__nutrition-container">
      <h4 className="pizza__nutrition-title">📊 კვებითი ღირებულება</h4>
      <div className="pizza__nutrition-current">
        <h6 className="pizza__nutrition-current-title">ამორჩეული ზომა:</h6>
        <p className="pizza__nutrition-current-value">
          {pizzaSize}სმ. {count}ც.
        </p>
      </div>
      <div className="pizza__nutrition-cards-wrapper">
        <div className="pizza__nutrition-card">
          <div className="pizza__nutrition-card-logo pizza__nutrition-card-logo--cal">
            🔥
          </div>
          <div className="pizza__nutrition-card-value pizza__nutrition-card-value--cal">
            {count * pizza["nutrition_info"][`${pizzaSize}`]["calories"]}
          </div>
          <div className="pizza__nutrition-card-title">კალორია</div>
        </div>
        <div className="pizza__nutrition-card">
          <div className="pizza__nutrition-card-logo pizza__nutrition-card-logo--protein">
            💪
          </div>
          <div className="pizza__nutrition-card-value pizza__nutrition-card-value--protein">
            {count * pizza["nutrition_info"][`${pizzaSize}`]["protein"]}გ
          </div>
          <div className="pizza__nutrition-card-title">ცილა</div>
        </div>
      </div>
      <div className="pizza__nutrition-table-container">
        <h5 className="pizza__nutrition-table-title">ზომების შედარება:</h5>
        <div className="pizza__nutrition-table-wrapper">
          {Object.keys(pizza["nutrition_info"]).map((size) => (
            <div
              className={
                "pizza__nutrition-table-item " +
                (pizzaSize == size ? "pizza__nutrition-table-item--active" : "")
              }
              key={`nutritionSize_${size}`}
            >
              <p className="pizza__nutrition-table-size">{size}სმ.</p>
              <div className="pizza__nutrition-table-info">
                <div className="pizza__nutrition-table-cal">
                  {pizza["nutrition_info"][size]["calories"]}კალ
                </div>
                <div className="pizza__nutrition-table-protein">
                  {pizza["nutrition_info"][size]["protein"]}გ პროტეინი
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaNutrition;
