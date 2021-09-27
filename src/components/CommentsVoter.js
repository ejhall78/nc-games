import { useState } from 'react';

export const CommentsVoter = ({
  comment_id,
  incrementVotes,
  decrementVotes,
}) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  return (
    <div>
      <button
        className="button is-success is-small"
        disabled={upVoted}
        onClick={() =>
          incrementVotes(
            comment_id,
            upVoted,
            downVoted,
            setUpVoted,
            setDownVoted
          )
        }
      >
        Up Vote
      </button>
      <button
        disabled={downVoted}
        className="button is-danger is-small"
        onClick={() =>
          decrementVotes(
            comment_id,
            upVoted,
            downVoted,
            setUpVoted,
            setDownVoted
          )
        }
      >
        Down Vote
      </button>
    </div>
  );
};
