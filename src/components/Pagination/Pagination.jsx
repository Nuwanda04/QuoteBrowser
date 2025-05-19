export default function Pagination({ totalPages, page, onPageChange }) {
  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>

      <span>
        {" "}
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
