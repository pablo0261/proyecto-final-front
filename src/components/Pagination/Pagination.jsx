import React from 'react';
import styles from "./Pagination.module.sass";


const Pagination = ({ count, pageNumber, totalCount, totalOfPages, queryProps, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalOfPages; i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    const queryConstructOrder = `&pageNumber=${pageNumber - 1}`;
    onPageChange(queryConstructOrder);
  };

  const onNextPage = () => {
    const queryConstructOrder = `&pageNumber=${pageNumber + 1}`;
    onPageChange(queryConstructOrder);
  };

  const onSpeficPage = (pageNumber) => {
    const queryConstructOrder = `&pageNumber=${pageNumber}`;
    onPageChange(queryConstructOrder);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={onPrevPage} disabled={pageNumber === 1} className={pageNumber === 1 ? styles.btnInactive : styles.btnActive}>Anterior</button>

      {pageNumbers.map((NumberOfPage) => (
        <div key={NumberOfPage} className={styles['button-container']}>
          <button
            className={NumberOfPage === pageNumber ? styles.active : styles.inactive}
            onClick={() => onSpeficPage(NumberOfPage)}
          >
            {NumberOfPage}
          </button>
        </div>
      ))}

      <button onClick={onNextPage} disabled={pageNumber >= totalOfPages} className={pageNumber === totalOfPages ? styles.btnInactive : styles.btnActive}>Siguiente</button>
    </div>
  );
};

export default Pagination;
