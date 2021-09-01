import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReviews } from '../api';

export const ReviewsList = ({ isLoading, setIsLoading }) => {
  const [reviews, setReviews] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviews(category)
      .then(reviewsFromApi => {
        setIsLoading(false);
        setReviews(reviewsFromApi);
      })
      .catch(err => console.log(err));
  }, [category]);

  return (
    <div>
      <h2>{category ? category : null}</h2>
      <Link to="/reviews/write-review">
        <p>Write a review</p>
      </Link>
      {isLoading ? 'Loading...' : null}
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
                <p>Comments: {comment_count}</p>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
