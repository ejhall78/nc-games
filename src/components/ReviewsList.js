import { useParams, Link } from 'react-router-dom';
import { useReviewsList } from '../hooks/useReviewsList';

export const ReviewsList = () => {
  const { category } = useParams();
  const { reviews, isLoading, incrementVotes, decrementVotes, err } =
    useReviewsList(category);

  return (
    <div>
      <h2>{category ? category : null}</h2>
      <Link to="/reviews/write-review">
        <p>Write a review</p>
      </Link>
      <p>{isLoading ? 'Loading...' : null}</p>
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
