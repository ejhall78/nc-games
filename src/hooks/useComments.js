import { useEffect, useState } from 'react';
import { getCommentsById, patchCommentVotes } from '../api';

export const useComments = review_id => {
  const [comments, setComments] = useState([]);
  const [total_count, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page > 0) {
      setIsLoading(true);
      getCommentsById(review_id, page)
        .then(({ comments, total_count }) => {
          setComments(comments);
          setTotalCount(total_count);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [review_id, setTotalCount, page]);

  const incrementVotes = comment_id => {
    setComments(currentComments => {
      const updatedComments = currentComments.map(comment => {
        const newComment = { ...comment };

        if (newComment.comment_id === comment_id) {
          newComment.votes++;
        }

        return newComment;
      });

      return updatedComments;
    });
    setErr(null);

    // patch
    patchCommentVotes(comment_id, 1).catch(err => {
      console.log(err);
      setComments(currentComments => {
        const updatedComments = currentComments.map(comment => {
          const newComment = { ...comment };

          if (newComment.comment_id === comment_id) {
            newComment.votes--;
          }

          return newComment;
        });

        return updatedComments;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  const decrementVotes = comment_id => {
    setComments(currentComments => {
      const updatedComments = currentComments.map(comment => {
        const newComment = { ...comment };

        if (newComment.comment_id === comment_id) {
          newComment.votes--;
        }

        return newComment;
      });

      return updatedComments;
    });
    setErr(null);

    // patch
    patchCommentVotes(comment_id, -1).catch(err => {
      console.log(err);
      setComments(currentComments => {
        const updatedComments = currentComments.map(comment => {
          const newComment = { ...comment };

          if (newComment.comment_id === comment_id) {
            newComment.votes++;
          }

          return newComment;
        });

        return updatedComments;
      });
      setErr('Something went wrong, please try again.');
    });
  };

  return {
    comments,
    setComments,
    isLoading,
    incrementVotes,
    decrementVotes,
    err,
    total_count,
    setPage,
  };
};
