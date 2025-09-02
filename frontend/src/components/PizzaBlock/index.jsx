import { useSelector, useDispatch } from "react-redux";
import React from "react";

import { addItem } from "./../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

export const pizzaTypesNames = ["ტრადიციული", "თხელი"];
export const pizzaSizes = [26, 30, 40];

export const sizePrices = {
  26: 0,
  30: 3,
  40: 5,
};

export const typePrices = {
  თხელი: 3,
  ტრადიციული: 0,
};

function PizzaBlock({ title, slug, image_file, price, ingredients }) {
  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    if (a.length === b.length) return 0;
  });
  const ingredientsContainer = React.useRef(null);
  const lastIndex = React.useRef(ingredients.length - 1);
  const [visibleCount, setVisibleCount] = React.useState(ingredients.length);

  React.useLayoutEffect(() => {
    const container = ingredientsContainer.current;
    if (!container) return;

    const lis = Array.from(container.querySelectorAll("li"));
    if (!lis.length) return;

    let callback = (entries, observer) => {
      let count = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          count++;
        }
      });
      setVisibleCount(count);
    };

    const io = new IntersectionObserver(callback, {
      root: container,
      threshold: 1.0,
    });
    lis.forEach((li) => io.observe(li));

    return () => {
      lis.forEach((li) => io.unobserve(li));
    };
  }, [sortedIngredients]);

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={"/api/pizzas/image/" + image_file}
          alt="Pizza"
          loading="lazy"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__ingredients" ref={ingredientsContainer}>
          <ul>
            {sortedIngredients
              .slice(0, visibleCount)
              .map((ingredient, i, arr) => (
                <li key={`${slug}_ingredient_${i}`}>
                  {ingredient +
                    (i === lastIndex || i === ingredients.length - 1
                      ? "."
                      : ", ")}
                </li>
              ))}
            {visibleCount < ingredients.length && (
              <p>
                <b>...🔸{ingredients.length - visibleCount}</b>
              </p>
            )}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">₾{price} დან</div>
          <Link to={"/pizza/" + slug}>
            <div className="button button--outline button--view">
              <span>არჩევა</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
