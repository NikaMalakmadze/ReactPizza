const PizzaStats = ({ pizza }) => {
  let starsCount = Math.floor(pizza.score / 2);
  if (pizza.score % 2) starsCount += 1;

  return (
    <>
      <h3 className="pizza__title">{pizza.title}</h3>
      <div className="pizza__stats">
        <p className="pizza__stars">
          {"⭐".repeat(starsCount)} {pizza.score}/10
        </p>
        <div className="pizza__bake-time">
          ⏱️ {pizza.bake_time.map((item) => item.toString()).join("-")} წუთი
        </div>
      </div>
    </>
  );
};

export default PizzaStats;
