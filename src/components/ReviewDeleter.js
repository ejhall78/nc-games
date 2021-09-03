import { deleteReview } from '../api';

export const ReviewDeleter = ({ setReviews, review_id }) => {
  const handleClick = () => {
    // optimistically remove review from state
    setReviews(currentReviews => {
      const reviewRemoved = currentReviews.filter(
        review => review.review_id !== review_id
      );

      return reviewRemoved;
    });

    // delete review from database
    deleteReview(review_id).catch(err => console.log(err));
  };

  return <button onClick={handleClick}>Delete</button>;
};
