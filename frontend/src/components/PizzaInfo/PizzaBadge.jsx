const PizzaBadge = ({ text, type }) => {
  return (
    <div className={"pizza__badge pizza__badge--" + type}>
      <div className="pizza__badge-text">{text}</div>
    </div>
  );
};

export default PizzaBadge;
