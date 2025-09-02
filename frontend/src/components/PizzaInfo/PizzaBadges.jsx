import PizzaBadge from "./PizzaBadge";

const PizzaBadges = ({ pizza }) => {
  return (
    <div className="pizza__badges">
      {pizza.score > 4 && <PizzaBadge type="popular" text="🔥 პოპულარული" />}
      {pizza.is_vegan && (
        <PizzaBadge type="vegetarian" text="🌱 ვეგეტარიანული" />
      )}
      {pizza.is_spicy && <PizzaBadge type="spicy" text="🌶️ მწარე" />}
      {pizza.discount_percent > 0 && (
        <PizzaBadge type="discount" text={`-${pizza.discount_percent}%`} />
      )}
    </div>
  );
};

export default PizzaBadges;
