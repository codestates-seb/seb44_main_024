import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
interface PaginationProps {
  totalReviews: number;
  movieId?: string;
  pageNumber: number;
}

const Pagination = ({ totalReviews, movieId, pageNumber }: PaginationProps) => {
  const navigate = useNavigate();
  const [pageWindow, setPageWindow] = useState([1, 2, 3, 4, 5]);
  const reviewPerPage = 5;
  const totalPages = Math.ceil(totalReviews / reviewPerPage);
  const nextPages = () => {
    const newPageWindow = pageWindow.map((page) => page + 5);
    setPageWindow(newPageWindow);
    navigate(`/movies/${movieId}?page=${newPageWindow[0]}`);
  };
  const previousPages = () => {
    const newPageWindow = pageWindow.map((page) => page - 5);
    setPageWindow(newPageWindow);
    navigate(`/movies/${movieId}?page=${newPageWindow[4]}`);
  };
  return (
    <>
      {pageNumber > 5 && (
        <button className="mr-3 text-xl" onClick={previousPages}>
          &lt;
        </button>
      )}
      {pageWindow.map(
        (page) =>
          page <= totalPages && (
            <Link
              key={page}
              to={`/movies/${movieId}?page=${page}`}
              className={`px-2 ${pageNumber === page ? 'rounded-full bg-yellow-200' : ''}`}
            >
              {page}
            </Link>
          )
      )}
      {totalPages > 5 && totalPages > pageWindow[4] && (
        <button className="ml-3 text-xl" onClick={nextPages}>
          &gt;
        </button>
      )}
    </>
  );
};

export default Pagination;
