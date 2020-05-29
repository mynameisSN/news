import React from 'react';

const Pagination = props => {
  const pageLinks = [];
  for (let i = 0; i < props.pages; i++) {
    let active = props.currentPage === i ? 'active' : '';

    pageLinks.push (
      <li
        className={`waves-effect ${active}`}
        key={i}
        onClick={() => {
          props.nextPage (i);
        }}
      >
        <a href="#">{i + 1}</a>
      </li>
    );
  }
  return (
    <div className="pagination">
      <ul>
        {props.currentPage > 0
          ? <li
              className={`waves-effect`}
              onClick={() => props.nextPage (props.currentPage - 1)}
            >
              <a href="#">Prev</a>
            </li>
          : ''}
        {pageLinks}
        {props.currentPage < props.pages - 1
          ? <li
              className={`waves-effect`}
              onClick={() => props.nextPage (props.currentPage + 1)}
            >
              <a href="#">Next</a>
            </li>
          : ''}
      </ul>
    </div>
  );
};

export default Pagination;
