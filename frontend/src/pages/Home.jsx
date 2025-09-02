import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import qs from "qs";

import { setCurrentPage, setFilter } from "./../redux/slices/filterSlice";
import Categories, { categories } from "./../components/Categories";
import { fetchPizzas } from "./../redux/slices/pizzasSlice";
import Skeleton from "./../components/PizzaBlock/skeleton";
import PizzaBlock from "./../components/PizzaBlock/index";
import Pagination from "./../components/Pagination/index";
import Sort, { sortByList } from "./../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isFirstRender = useRef(false);
  const { categoryId, sort, currentPage, search, updated } = useSelector(
    (state) => state.filter
  );
  const { items, totalPages, status, isEmpty } = useSelector(
    (state) => state.pizza
  );

  let params;

  const getPizzas = async () => {
    try {
      dispatch(fetchPizzas({ sort, currentPage, categoryId, search }));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      params = qs.parse(window.location.search.substring(1));

      const sort = sortByList.find((item) => item.sortType === params.sortType);

      dispatch(setFilter({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [currentPage, sort.sortType, categoryId, search, updated]);

  React.useEffect(() => {
    if (currentPage !== 1) {
      status === "error"
        ? dispatch(setCurrentPage(1))
        : dispatch(setCurrentPage(0));
    }
  }, [categoryId]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      const queryString = qs.stringify({
        sortType: sort.sortType,
        currentPage,
        categoryId,
        search,
      });

      navigate(`?${queryString}`);
    } else {
      isFirstRender.current = true;
    }
  }, [currentPage, sort.sortType, categoryId, search]);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items?.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} პიცა</h2>
      <div className="content__items">
        {status === "pending" ? skeletons : pizzas}
      </div>
      {isEmpty && (
        <div className="empty-card">
          <span>👨‍🍳</span>
          <h2 className="empty-card__title">
            ამ კატეგორიაში ჯერჯერობით არაფერი არ გვაქვს
          </h2>
          <p className="empty-card__desc">
            თუმცა არ იდარდოთ, სიახლეები მალე გვექნება
          </p>
        </div>
      )}
      <Pagination pages={totalPages} />
    </div>
  );
};

export default Home;
