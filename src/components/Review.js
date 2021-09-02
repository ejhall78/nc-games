import { useParams, Link } from 'react-router-dom';
import { useReview } from '../hooks/useReview';
import { Comments } from './Comments';

export const Review = ({ currentUser }) => {
  const { review_id } = useParams();
  const { review, incrementVotes, decrementVotes, err, isLoading } =
    useReview(review_id);

  return (
    <div>
      <Link to="/reviews/write-review">
        <p>Write a review as {currentUser.username}</p>
      </Link>
      <div className="Review">
        <p>{isLoading ? 'Loading...' : null}</p>
        <p>{review.owner}</p>
        <p>Votes {review.votes}</p>
        <p>{err ? err : null}</p>
        <button onClick={incrementVotes}>Up vote</button>
        <button onClick={decrementVotes}>Down vote</button>
        <h2>{review.title}</h2>
        <img
          alt={review.title}
          src={review.review_img_url}
          height="20%"
          width="20%"
        />
        <p>{review.review_body}</p>
      </div>
      <Comments review_id={review_id} currentUser={currentUser} />
    </div>
  );
};
