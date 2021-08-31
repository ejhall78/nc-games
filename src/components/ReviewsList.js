import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../api';

export const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    getReviews(category)
      .then(reviewsFromApi => {
        setReviews(reviewsFromApi);
      })
      .catch(err => console.log(err));
  }, [category]);

  return (
    <div>
      <h2>{category ? category : null}</h2>
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
