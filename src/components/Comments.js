import { Link } from 'react-router-dom';
import { useComments } from '../hooks/useComments';
import { CommentAdder } from './CommentAdder';
import { CommentDeleter } from './CommentDeleter';
import { CommentsNav } from './CommentsNav';

export const Comments = ({ review_id, currentUser }) => {
  const {
    comments,
    setComments,
    isLoading,
    incrementVotes,
    decrementVotes,
    err,
    total_count,
    setPage,
    page,
  } = useComments(review_id);

  return (
    <div className="content is-normal">
      <h3>Comments</h3>
      <CommentAdder
        currentUser={currentUser}
        review_id={review_id}
        setComments={setComments}
      />
      <p>{isLoading ? 'Loading...' : null}</p>
      <div className="list">
        {comments.map(({ votes, created_at, author, body, comment_id }) => {
          return (
            <div className="box">
              <div key={comment_id}>
                {author === currentUser.username ? (
                  <CommentDeleter
                    setComments={setComments}
                    comments={comments}
                    comment_id={comment_id}
                  />
                ) : null}
                <Link to={`/users/${author}`}>
                  <p>{author}</p>
                </Link>
                <p>Votes: {votes}</p>
                <p>{err ? err : null}</p>
                <button
                  className="button is-success"
                  onClick={() => incrementVotes(comment_id)}
                >
                  Up Vote
                </button>
                <button
                  className="button is-danger"
                  onClick={() => decrementVotes(comment_id)}
                >
                  Down Vote
                </button>
                <div className="content">
                  <p>{body}</p>
                  <p>{created_at.replaceAll('T', ' ').slice(0, -5)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CommentsNav setPage={setPage} total_count={total_count} page={page} />
    </div>
  );
};
