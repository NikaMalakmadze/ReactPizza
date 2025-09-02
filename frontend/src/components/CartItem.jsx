import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import qs from "qs";

import { addItem, removeItem, deleteItem } from "./../redux/slices/cartSlice";
import { pizzaSizes, pizzaTypesNames, sizePrices } from "./PizzaBlock";

const CartItem = ({
  id,
  title,
  slug,
  pizzaPrice,
  type,
  size,
  count,
  image_file,
  discount,
}) => {
  const dispatch = useDispatch();

  const item = {
    id,
    title,
    pizzaPrice,
    image_file,
    type: type,
    size: size,
    count: 1,
  };

  const path = qs.stringify({
    currentTab: 1,
    pizzaType: type,
    pizzaSize: pizzaSizes[size],
  });

  const increment = () => {
    dispatch(addItem(item));
  };

  const decrement = () => {
    dispatch(removeItem(item));
  };

  const deleteItemFromCart = () => {
    dispatch(deleteItem({ id, type, size }));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-header">
        <div className="cart__item-img">
          <img
            className="pizza-block__image"
            src={`/api/pizzas/image/${image_file}`}
            alt={title + " image"}
          />
        </div>
        <div className="cart__item-info">
          <Link to={`/pizza/${slug}?${path}`}>
            <h3>{title}</h3>
          </Link>
          <p>
            {pizzaTypesNames[type]} ცომი, {pizzaSizes[size]} სმ.
          </p>
        </div>
      </div>

      <div className="cart__item-footer">
        <div className="cart__item-count">
          <div
            onClick={() => {
              if (count > 1) {
                decrement();
              }
            }}
            className={
              "button button--outline button--circle cart__item-count-minus " +
              (count === 1 ? "cart__item-count-minus--disabled" : "")
            }
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </div>
          <b>{count}</b>
          <div
            onClick={increment}
            className="button button--outline button--circle cart__item-count-plus"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </div>
        </div>
        <div className="cart__item-price">
          <b>
            {discount === 0
              ? (pizzaPrice * count).toFixed(2)
              : (pizzaPrice * (1 - discount / 100) * count).toFixed(2)}
            ₾
          </b>
        </div>
        <div onClick={deleteItemFromCart} className="cart__item-remove">
          <div className="button button--outline button--circle">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
