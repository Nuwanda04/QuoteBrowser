import styles from './Pagination.module.css';

// Shows page numbers and navigation buttons
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Hide if only one page
  if (totalPages <= 1) return null;

  // Create array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Max pages to show at once
    
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to display
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range if near start/end
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
    }
    
    // Add ... if pages are skipped
    if (start > 2) pages.push('...');
    
    // Add middle page numbers
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    
    // Add ... before last page if needed
    if (end < totalPages - 1) pages.push('...');
    
    // Add last page
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
        aria-label="Previous page"
      >
        Previous
      </button>
      
      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>;
        }
        
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            aria-current={page === currentPage ? 'page' : null}
          >
            {page}
          </button>
        );
      })}
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
