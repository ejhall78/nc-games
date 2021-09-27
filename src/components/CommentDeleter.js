import { useState } from 'react';
import { deleteComment } from '../api';

export const CommentDeleter = ({
  comment_id,
  setComments,
  comments,
  setDeleted,
}) => {
  const [err, setErr] = useState(null);
  const [currentComment, setCurrentComment] = useState({});

  // TODO work out why error handling isn't working when no internet connection

  const handleClick = () => {
    //save currentComment in state if anything goes wrong
    setCurrentComment(
      comments.find(comment => comment.comment_id === comment_id)
    );

    // optimistically remove comment from state
    setComments(currentComments => {
      const commentRemoved = currentComments.filter(
        comment => comment.comment_id !== comment_id
      );

      return commentRemoved;
    });
    setErr(null);
    // delete from server
    deleteComment(comment_id)
      .then(() => {
        setDeleted(true);
      })
      .catch(err => {
        console.log(err);

        setComments(currentComments => {
          return [currentComment, ...currentComments];
        });

        setErr('Something went wrong, please try again.');
      });
  };

  return (
    <div>
      {err ? err : null}
      <button
        className="button is-danger is-outlined"
        onClick={() => handleClick()}
      >
        Delete
      </button>
    </div>
  );
};
