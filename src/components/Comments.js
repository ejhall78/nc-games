import { Link } from 'react-router-dom';
import { useComments } from '../hooks/useComments';
import { CommentAdder } from './CommentAdder';
import { CommentDeleter } from './CommentDeleter';
import { CommentsNav } from './CommentsNav';
import { CommentsVoter } from './CommentsVoter';

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
    deleted,
    setDeleted,
  } = useComments(review_id);

  return (
    <div className="content is-normal">
      <h3>Comments</h3>
      <CommentAdder
        currentUser={currentUser}
        review_id={review_id}
        setComments={setComments}
        setDeleted={setDeleted}
      />
      <p>{isLoading ? 'Loading...' : null}</p>
      <p>{deleted ? 'Comment Deleted' : null}</p>
      <div className="list">
        {comments.map(({ votes, created_at, author, body, comment_id }) => {
          return (
            <div className="box" key={comment_id}>
              {author === currentUser.username ? (
                <CommentDeleter
                  setComments={setComments}
                  comments={comments}
                  comment_id={comment_id}
                  setDeleted={setDeleted}
                />
              ) : null}
              <Link to={`/users/${author}`}>
                <p>{author}</p>
              </Link>
              <p>Votes: {votes}</p>
              <p>{err ? err : null}</p>
              <CommentsVoter
                comment_id={comment_id}
                incrementVotes={incrementVotes}
                decrementVotes={decrementVotes}
              />
              <div className="content">
                <p>{body}</p>
                <p>{created_at.replaceAll('T', ' ').slice(0, -5)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <CommentsNav setPage={setPage} total_count={total_count} page={page} />
    </div>
  );
};
