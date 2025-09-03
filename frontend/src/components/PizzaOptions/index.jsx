import styles from "./PizzaOptions.module.scss";
import PizzaSizeCard from "./PizzaSizeCard";
import PizzaTypeCard from "./PizzaTypeCard";
import PizzaBuyCard from "./PizzaBuyCard";

const PizzaOptions = () => {
  return (
    <div className={styles.root}>
      <div className="pizza__options">
        <PizzaTypeCard />
        <PizzaSizeCard />
        <PizzaBuyCard />
      </div>
    </div>
  );
};

export default PizzaOptions;
