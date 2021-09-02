import { useState } from 'react';
import { postComment } from '../api';

export const CommentAdder = ({
  currentUser: { username },
  review_id,
  setComments,
}) => {
  const [body, setBody] = useState('');
  // const [err, setErr] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    postComment(body, username, review_id).then(commentFromApi => {
      setComments(currentComments => {
        return [commentFromApi, ...currentComments];
      });
      setBody('');
      // setErr(null);
    });
    // .catch(err => {
    //   setComments(currentComments => {
    //     const firstCommentRemoved = [...currentComments].shift();
    //     return firstCommentRemoved;
    //   });
    //   setErr('Something went wrong, please try again.');
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Leave a comment</h4>
      {/* <p>{err ? err : null}</p> */}
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
