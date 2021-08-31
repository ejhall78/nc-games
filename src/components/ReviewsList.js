import { useState, useEffect } from 'react';
import { getReviews } from '../api';

export const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews()
      .then(reviewsFromApi => {
        setReviews(reviewsFromApi);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <ul className="ReviewsList">
        {reviews.map(
          ({ review_id, owner, title, review_img_url, review_body }) => {
            return (
              <li key={review_id} className="ReviewsList__review">
                <p>{owner}</p>
                <p>{title}</p>
                <img
                  alt={title}
                  src={review_img_url}
                  height="20%"
                  width="20%"
                />
                <p>{review_body}</p>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
