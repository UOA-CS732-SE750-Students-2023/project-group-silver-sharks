import React, { useState, useEffect } from 'react';
import './PaginationBar.css'; // 引入自定义样式文件

const PaginationBar = ({ itemsLength, itemsPerPage, onItemsChange, initialPage, searchTerm, previousIsSearch, previousPageNumber }) => {
  const [ currentPage, setCurrentPage] = useState(1) 
  

  useEffect(() => {
  
    let shouldBeSearching;
    if (searchTerm.length === 0 || !previousIsSearch){ 
      shouldBeSearching = false
    } else { 
      shouldBeSearching = true
    }
    onItemsChange(currentPage, searchTerm, shouldBeSearching);
  }, [currentPage]);

  console.log(length)
  const totalPages = Math.ceil(itemsLength / itemsPerPage);

  // if the isSearch boolean changes or the category variable changes or the filter variable changes 
  // then set the currently selected page to 1.

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
