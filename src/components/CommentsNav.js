export const CommentsNav = ({ setPage, total_count, page }) => {
  return (
    <div>
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(currentPage => currentPage - 1);
        }}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage(currentPage => currentPage + 1);
        }}
        disabled={5 * page >= total_count}
      >
        Next Page
      </button>
    </div>
  );
};
