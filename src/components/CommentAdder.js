import { useState } from 'react';
import { postComment } from '../api';

export const CommentAdder = ({
  currentUser,
  review_id,
  comments,
  setComments,
}) => {
  const [body, setBody] = useState('');
  const { username } = currentUser;

  const handleSubmit = event => {
    event.preventDefault();

    postComment(body, username, review_id).then(commentFromApi => {
      setComments(currentComments => {
        return [commentFromApi, ...currentComments];
      });

      setBody('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Leave a comment</h4>
      <label>
        Write here:
        <textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </label>
    </form>
  );
};
