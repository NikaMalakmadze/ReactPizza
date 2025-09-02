import { useSelector } from "react-redux";
import PizzaDescSkeleton from "./Skeletons/PizzaDescSkeleton";

const PizzaDesc = () => {
  const { status, pizza } = useSelector((state) => state.currentPizza);

  return status === "pending" || !status ? (
    <PizzaDescSkeleton />
  ) : (
    <p className="pizza__stats-desc">{pizza.description}</p>
  );
};

export default PizzaDesc;
