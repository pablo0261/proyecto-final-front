import React from 'react';
import styles from "./Pagination.module.scss";
import { getPeopleFilteredOrderedPagination } from "../../redux/actions";
import { useDispatch } from "react-redux";


const Pagination = ({ pageNumber, totalOfPages , queryProps}) => {
    const dispatch = useDispatch();

  const pageNumbers = [];

  for (let i = 1; i <= totalOfPages; i++) {
    pageNumbers.push(i);
  }

  const handlerPagination = (queryConstructOrder) => {
      dispatch(getPeopleFilteredOrderedPagination(queryProps, queryConstructOrder));
  }

  const onPrevPage = () => {
    const queryConstructOrder = `&pageNumber=${pageNumber - 1}`;
    handlerPagination(queryConstructOrder)
  };
  const onNextPage = () => {
    const queryConstructOrder = `&pageNumber=${pageNumber + 1}`;
    handlerPagination(queryConstructOrder)  };
  const onSpeficPage = (pageNumber) => {
    const queryConstructOrder = `&pageNumber=${pageNumber}`;
    handlerPagination(queryConstructOrder)
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={onPrevPage} disabled={pageNumber === 1}>Anterior</button>

      {pageNumbers.map((NumberOfPage) => (
        <div key={NumberOfPage} className={styles['button-container']}>
          <button
            className={`${styles.button} ${NumberOfPage === pageNumber ? styles.active : ''}`}
            onClick={() => onSpeficPage(NumberOfPage)}
          >
            {NumberOfPage}
          </button>
        </div>
      ))}

      <button onClick={onNextPage} disabled={pageNumber >= totalOfPages}>Siguiente</button>
    </div>
  );
};

export default Pagination;