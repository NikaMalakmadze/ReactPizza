import { Link } from "react-router-dom";

import emptyImg from "./../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        კალათა სუფთაა <span>😕</span>
      </h2>
      <p>
        სავარაუდოდ, თქვენ ჯერ კიდევ არ შეგიკვეთავთ პიცა.
        <br />
        იმისათვის, რომ შეუკვეთოთ პიცა გადადით მთავარ გვერდზე
      </p>
      <img src={emptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>უკან დაბრუნება</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
