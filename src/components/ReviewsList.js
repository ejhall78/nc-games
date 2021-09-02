import { useParams, Link } from 'react-router-dom';
import { useReviewsList } from '../hooks/useReviewsList';

export const ReviewsList = () => {
  const { category } = useParams();
  const {
    reviews,
    isLoading,
    incrementVotes,
    decrementVotes,
    err,
    sortBy,
    setSortBy,
    order,
    setOrder,
  } = useReviewsList(category);

  return (
    <div>
      <h2>{category ? category : null}</h2>
      <Link to="/reviews/write-review">
        <p>Write a review</p>
      </Link>
      <p>{isLoading ? 'Loading...' : null}</p>
      {/* TODO extract drop downs into components */}
      <select
        value={sortBy ? sortBy : ''}
        onChange={event => setSortBy(event.target.value)}
      >
        <option value="" defaultValue>
          Sort Reviews
        </option>
        <option value="created_at">Date</option>
        <option value="comment_count">Number of Comments</option>
        <option value="votes">Votes</option>
      </select>
      <select
        value={order ? order : ''}
        onChange={event => setOrder(event.target.value)}
      >
        <option value="asc" defaultValue>
          Ascending
        </option>
        <option value="desc">Descending</option>
      </select>
      <ul className="ReviewsList">
        {reviews.map(
          ({
            review_id,
            owner,
            title,
            review_img_url,
            votes,
            comment_count,
          }) => {
            return (
              <li key={review_id} className="ReviewsList__review">
                <Link to={`/reviews/${review_id}`}>
                  <p>{title}</p>
                  <img
                    alt={title}
                    src={review_img_url}
                    height="20%"
                    width="20%"
                  />
                </Link>
                <Link to={`/users/${owner}`}>
                  <p>{owner}</p>
                </Link>
                <p>Votes: {votes}</p>
                <p>{err ? err : null}</p>
                <button onClick={() => incrementVotes(review_id)}>
                  Up Vote
                </button>
                <button onClick={() => decrementVotes(review_id)}>
                  Down Vote
                </button>
                <p>Comments: {comment_count}</p>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

// drop down to sort reviews - needs someway to use setSortBy when option selected
/* <select>
        <option value="" disabled selected>
          Sort Reviews
        </option>
        <option value="created_at">Date</option>
        <option value="comment_count">Number of Comments</option>
        <option value="votes">Votes</option>
      </select> */
