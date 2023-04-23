import React, { useState, useEffect } from 'react';
import './PaginationBar.css'; // 引入自定义样式文件

const PaginationBar = ({ itemsLength, itemsPerPage, onItemsChange, initialPage }) => {
  console.log("-------PAGINATION BAR RENDER------------------")
  const [ currentPage, setCurrentPage] = useState(initialPage) 

  useEffect(() => {
    onItemsChange(currentPage);
  }, [currentPage]);

  console.log(length)
  const totalPages = Math.ceil(itemsLength / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  const grayBackgroundStyle = {
    backgroundColor: '#F1F1F1',
  };

  return (
    <div style={grayBackgroundStyle}>
      <nav aria-label="Page navigation" className="pagination-container">
        <div className="pagination-wrapper">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}>
                &lt;
              </button>
            </li>
            {pages.map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}>
                &gt;
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PaginationBar;
