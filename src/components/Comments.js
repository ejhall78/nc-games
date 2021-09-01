import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCommentsById } from '../api';

export const Comments = ({ review_id, isLoading, setIsLoading }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsById(review_id)
      .then(commentsFromApi => {
        setComments(commentsFromApi);
      })
      .catch(err => console.log(err));
  }, [review_id]);

  return (
    <div className="Comments">
      <h3>Comments</h3>
      <ul className="Comments__commentsList">
        {comments.map(({ votes, created_at, author, body, comment_id }) => {
          return (
            <li key={comment_id}>
              <Link to={`/users/${author}`}>
                <p>{author}</p>
              </Link>
              <p>Votes: {votes}</p>
              <p>{body}</p>
              <p>{created_at.toString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
