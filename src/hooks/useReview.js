import { useEffect, useState } from 'react';
import { getReviewById, patchReviewVotes } from '../api';

export const useReview = review_id => {
  const [review, setReview] = useState({});
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id)
      .then(reviewFromApi => {
        setReview(reviewFromApi);
        setIsLoading(false);
      })
      .catch(err => {
        setReview({ title: 'This review does not exist...' });
        setIsLoading(false);
      });
  }, [review_id]);

  const incrementVotes = () => {
    // set votes state ++ optimistically
    setReview(currentReview => {
      const updatedVotesReview = { ...currentReview };
      updatedVotesReview.votes++;
      return updatedVotesReview;
    });
    setErr(null);
    if (downVoted && !upVoted) {
      setUpVoted(true);
      setDownVoted(false);
    } else {
      setUpVoted(true);
    }

    // send patch request to server
    patchReviewVotes(review_id, 1).catch(err => {
      console.log(err);
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
    if (upVoted && !downVoted) {
      setUpVoted(false);
      setDownVoted(true);
    } else {
      setDownVoted(true);
    }

    // send patch request to server
    patchReviewVotes(review_id, -1).catch(err => {
      setReview(currentReview => {
        console.log(err);
        const updatedVotesReview = { ...currentReview };
        updatedVotesReview.votes++;
        return updatedVotesReview;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  return {
    review,
    incrementVotes,
    decrementVotes,
    err,
    isLoading,
    upVoted,
    downVoted,
  };
};
