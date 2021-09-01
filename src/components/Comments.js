import { Link } from 'react-router-dom';
import { useComments } from '../hooks/useComments';

export const Comments = ({ review_id }) => {
  const { comments, isLoading, incrementVotes, decrementVotes, err } =
    useComments(review_id);

  return (
    <div className="Comments">
      <h3>Comments</h3>
      <p>{isLoading ? 'Loading...' : null}</p>
      <ul className="Comments__commentsList">
        {comments.map(({ votes, created_at, author, body, comment_id }) => {
          return (
            <li key={comment_id}>
              <Link to={`/users/${author}`}>
                <p>{author}</p>
              </Link>
              <p>Votes: {votes}</p>
              <p>{err ? err : null}</p>
              <button onClick={() => incrementVotes(comment_id)}>
                Up Vote
              </button>
              <button onClick={() => decrementVotes(comment_id)}>
                Down Vote
              </button>
              <p>{body}</p>
              <p>{created_at.toString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
