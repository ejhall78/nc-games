import { useEffect, useState } from 'react';
import { getReviewById, patchReviewVotes } from '../api';

export const useReview = review_id => {
  const [review, setReview] = useState({});
  const [err, setErr] = useState(null);
  // isLoading

  useEffect(() => {
    getReviewById(review_id)
      .then(reviewFromApi => {
        setReview(reviewFromApi);
      })
      .catch(err => console.log(err));
  }, [review_id]);

  const incrementVotes = () => {
    // set votes state ++ optimistically
    setReview(currentReview => {
      const updatedVotesReview = { ...currentReview };
      updatedVotesReview.votes++;
      return updatedVotesReview;
    });
    setErr(null);
    // send patch request to server
    patchReviewVotes(review_id, 1).catch(err => {
      setReview(currentReview => {
        const updatedVotesReview = { ...currentReview };
        updatedVotesReview.votes--;
        return updatedVotesReview;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  const decrementVotes = () => {
    // set votes state -- optimistically
    setReview(currentReview => {
      const updatedVotesReview = { ...currentReview };
      updatedVotesReview.votes--;
      return updatedVotesReview;
    });
    setErr(null);
    // send patch request to server
    patchReviewVotes(review_id, -1).catch(err => {
      setReview(currentReview => {
        const updatedVotesReview = { ...currentReview };
        updatedVotesReview.votes++;
        return updatedVotesReview;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  return { review, incrementVotes, decrementVotes, err };
};
