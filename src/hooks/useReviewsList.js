import { useState, useEffect } from 'react';
import { getReviews } from '../api';
import { patchReviewVotes } from '../api';

export const useReviewsList = category => {
  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviews(category)
      .then(reviewsFromApi => {
        setReviews(reviewsFromApi);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [category]);

  const incrementVotes = review_id => {
    setReviews(currentReviews => {
      const updatedReviews = currentReviews.map(review => {
        const newReview = { ...review };

        if (newReview.review_id === review_id) {
          newReview.votes++;
        }

        return newReview;
      });

      return updatedReviews;
    });
    setErr(null);

    // patch
    patchReviewVotes(review_id, 1).catch(err => {
      console.log(err);
      setReviews(currentReviews => {
        const updatedReviews = currentReviews.map(Review => {
          const newReview = { ...Review };

          if (newReview.review_id === review_id) {
            newReview.votes--;
          }

          return newReview;
        });

        return updatedReviews;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  const decrementVotes = review_id => {
    setReviews(currentReviews => {
      const updatedReviews = currentReviews.map(review => {
        const newReview = { ...review };

        if (newReview.review_id === review_id) {
          newReview.votes--;
        }

        return newReview;
      });

      return updatedReviews;
    });
    setErr(null);

    // patch
    patchReviewVotes(review_id, -1).catch(err => {
      console.log(err);
      setReviews(currentReviews => {
        const updatedReviews = currentReviews.map(Review => {
          const newReview = { ...Review };

          if (newReview.review_id === review_id) {
            newReview.votes++;
          }

          return newReview;
        });

        return updatedReviews;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  return { reviews, isLoading, incrementVotes, decrementVotes, err };
};
