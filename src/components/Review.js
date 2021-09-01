import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById } from '../api';
import { Comments } from './Comments';

export const Review = () => {
  const [review, setReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id)
      .then(review => {
        setReview(review);
      })
      .catch(err => console.log(err));
  }, [review_id]);

  return (
    <div>
      <div className="Review">
        <p>{review.owner}</p>
        <p>Votes {review.votes}</p>
        <h2>{review.title}</h2>
        <img
          alt={review.title}
          src={review.review_img_url}
          height="20%"
          width="20%"
        />
        <p>{review.review_body}</p>
      </div>
      <Comments review_id={review_id} />
    </div>
  );
};
