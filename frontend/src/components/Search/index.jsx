import debounce from "lodash.debounce";
import React from "react";

import { setSearch } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const [searchValue, setSearchValue] = React.useState("");

  const searchForPizza = React.useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
      localStorage.setItem("search", value);
    }, 500),
    []
  );

  React.useEffect(() => {
    const searchValue = localStorage.getItem("search") || "";
    setSearchValue(searchValue);
    dispatch(setSearch(searchValue));
  }, []);

  return (
    <div className={styles.root}>
      <svg
        className="feather feather-search search"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="პიცის მოძებნა..."
        value={searchValue}
        ref={inputRef}
        onChange={() => {
          searchForPizza(inputRef.current.value);
          setSearchValue(inputRef.current.value);
        }}
      />
    </div>
  );
};

export default Search;
