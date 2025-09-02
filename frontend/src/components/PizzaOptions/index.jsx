import PizzaBuyCard from "./PizzaBuyCard";
import styles from "./PizzaOptions.module.scss";
import PizzaSizeCard from "./PizzaSizeCard";
import PizzaTypeCard from "./PizzaTypeCard";

const PizzaOptions = () => {
  return (
    <div className="pizza__options">
      <PizzaTypeCard />
      <PizzaSizeCard />
      <PizzaBuyCard />
    </div>
  );
};

export default PizzaOptions;
