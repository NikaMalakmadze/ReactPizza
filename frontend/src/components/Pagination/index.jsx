import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { setCurrentPage } from "./../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";

const Pagination = ({ pages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);

  if (pages === 1 || !pages) return;

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
