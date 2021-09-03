import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReviews } from '../api';
import { useReviewsList } from '../hooks/useReviewsList';
import { ReviewDeleter } from './ReviewDeleter';

export const ReviewsList = ({ currentUser }) => {
  const { category } = useParams();
  const {
    reviews,
    isLoading,
    incrementVotes,
    decrementVotes,
    err,
    sortBy,
    setSortBy,
    order,
    setOrder,
    setReviews,
    limit,
    setLimit,
    total_count,
    bottomReached,
    setBottomReached,
  } = useReviewsList(category);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom) {
        if (limit < 10 || limit === null) setLimit(20);
        else if (limit + 10 > +total_count) {
          setBottomReached('No more reviews');
        } else setLimit(currLimit => currLimit + 10);

        getReviews(category, sortBy, order, limit)
          .then(({ reviews }) => {
            setReviews(reviews);
          })
          .catch(err => console.log(err));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    setBottomReached,
    total_count,
    setReviews,
    setLimit,
    category,
    sortBy,
    order,
    limit,
  ]);

  return (
    <div>
      <h2>{category ? category : null}</h2>
      <Link to="/reviews/write-review">
        <p>Write a review as {currentUser.username}</p>
      </Link>
      <p>{isLoading ? 'Loading...' : null}</p>
      {/* TODO extract drop downs into components */}
      <select
        value={sortBy ? sortBy : ''}
        onChange={event => setSortBy(event.target.value)}
      >
        <option value="" defaultValue>
          Sort Reviews
        </option>
        <option value="created_at">Date</option>
        <option value="comment_count">Number of Comments</option>
        <option value="votes">Votes</option>
      </select>
      <select
        value={order ? order : ''}
        onChange={event => setOrder(event.target.value)}
      >
        <option value="asc" defaultValue>
          Ascending
        </option>
        <option value="desc">Descending</option>
      </select>
      <ul className="ReviewsList">
        {reviews.map(
          ({
            review_id,
            owner,
            title,
            review_img_url,
            votes,
            comment_count,
          }) => {
            return (
              <li key={review_id} className="ReviewsList__review">
                {owner === currentUser.username ? (
                  <ReviewDeleter
                    review_id={review_id}
                    setReviews={setReviews}
                  />
                ) : null}
                <Link to={`/reviews/${review_id}`}>
                  <p>{title}</p>
                  <img
                    alt={title}
                    src={review_img_url}
                    height="20%"
                    width="20%"
                  />
                </Link>
                <Link to={`/users/${owner}`}>
                  <p>{owner}</p>
                </Link>
                <p>Votes: {votes}</p>
                <p>{err ? err : null}</p>
                <button onClick={() => incrementVotes(review_id)}>
                  Up Vote
                </button>
                <button onClick={() => decrementVotes(review_id)}>
                  Down Vote
                </button>
                <p>Comments: {comment_count}</p>
              </li>
            );
          }
        )}
        {bottomReached ? bottomReached : null}
      </ul>
    </div>
  );
};

// drop down to sort reviews - needs someway to use setSortBy when option selected
/* <select>
        <option value="" disabled selected>
          Sort Reviews
        </option>
        <option value="created_at">Date</option>
        <option value="comment_count">Number of Comments</option>
        <option value="votes">Votes</option>
      </select> */
