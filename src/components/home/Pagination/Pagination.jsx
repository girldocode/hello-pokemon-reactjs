import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageButtons = 4; // Maximum number of page buttons to display

  // Calculate the range of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // Render the page buttons
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={
          currentPage === i
            ? `${classes["pagination-button"]} ${classes.active}`
            : classes["pagination-button"]
        }
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={classes.pagination}>
      <button
        className={`${classes["pagination-button"]} ${classes["prev-next"]}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {startPage > 1 && (
        <button
          className={classes["pagination-button"]}
          onClick={() => onPageChange(startPage - 1)}
        >
          ...
        </button>
      )}
      {pageButtons}
      {endPage < totalPages && (
        <button
          className={classes["pagination-button"]}
          onClick={() => onPageChange(endPage + 1)}
        >
          ...
        </button>
      )}
      <button
        className={`${classes["pagination-button"]} ${classes["prev-next"]}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
