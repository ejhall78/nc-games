import { useState, useEffect } from 'react';
import { getReviews } from '../api';
import { patchReviewVotes } from '../api';

export const useReviewsList = category => {
  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [limit, setLimit] = useState(null);
  const [total_count, setTotalCount] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [bottomReached, setBottomReached] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getReviews(category, sortBy, order)
      .then(({ reviews, total_count }) => {
        setReviews(reviews);
        setTotalCount(total_count);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [category, sortBy, order]);

  const incrementVotes = (
    review_id,
    upVoted,
    downVoted,
    setUpVoted,
    setDownVoted
  ) => {
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

    // if already voted, toggle downVoted back to false
    // this is to give the option of changing the vote
    if (downVoted && !upVoted) {
      setUpVoted(true);
      setDownVoted(false);
    } else {
      setUpVoted(true);
    }
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

  const decrementVotes = (
    review_id,
    upVoted,
    downVoted,
    setUpVoted,
    setDownVoted
  ) => {
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

    if (upVoted && !downVoted) {
      setUpVoted(false);
      setDownVoted(true);
    } else {
      setDownVoted(true);
    }

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

  return {
    reviews,
    isLoading,
    incrementVotes,
    decrementVotes,
    err,
    sortBy,
    setSortBy,
    order,
    setOrder,
    setReviews,
    limit,
    setLimit,
    total_count,
    bottomReached,
    setBottomReached,
    deleted,
    setDeleted,
  };
};
