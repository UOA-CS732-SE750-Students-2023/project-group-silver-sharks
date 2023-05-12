import React, { useState, useEffect } from 'react';
import './PaginationBar.css';

const PaginationBar = ({
  itemsLength,
  itemsPerPage,
  onItemsChange,
  initialPage,
  searchTerm,
  previousIsSearch,
  changeState,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    let shouldBeSearching;
    if (searchTerm.length === 0 || !previousIsSearch) {
      shouldBeSearching = false;
    } else {
      shouldBeSearching = true;
    }
    onItemsChange(currentPage, searchTerm, shouldBeSearching);
  }, [currentPage]);

  useEffect(() => {

    setCurrentPage(1);
  }, [changeState]);

  const totalPages = Math.ceil(itemsLength / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate an array of page numbers based on the current page
  const generatePageNumbers = () => {
    const visiblePages = 5;
    let pages = [];

    if (totalPages <= visiblePages) {
      pages = [...Array(totalPages).keys()].map((i) => i + 1);
    } else {
      const middle = Math.floor(visiblePages / 2);
      let start = currentPage - middle;
      let end = currentPage + middle;

      if (start < 1) {
        start = 1;
        end = visiblePages;
      }

      if (end >= totalPages) {
        start = totalPages - visiblePages + 1;
        end = totalPages;
      }

      pages = [...Array(end - start + 1).keys()].map((i) => start + i);
      if (start > 2) {
        pages.unshift(1, '...');
      } else if (start === 2) {
        pages.unshift(1);
      }
      if (end < totalPages - 1) {
        pages.push('...', totalPages);
      } else if (end === totalPages - 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

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

            {/* Page numbers */}
            {pages.map((page, index) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={typeof page !== 'number'}
                >
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
