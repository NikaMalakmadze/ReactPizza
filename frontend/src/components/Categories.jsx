import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "./../redux/slices/filterSlice";

export const categories = [
  "ყველა",
  "ხორცის",
  "ვეგეტარიანული",
  "გრილი",
  "მწარე",
  "დახურული",
];

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? "active" : ""}
            key={"Category" + index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
