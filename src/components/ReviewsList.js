import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReviews } from '../api';
import { useReviewsList } from '../hooks/useReviewsList';
import { ReviewDeleter } from './ReviewDeleter';
import { ReviewsListVoter } from './ReviewsListVoter';

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
    deleted,
    setDeleted,
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
    <div className="ReviewsList">
      <div className="content is-normal">
        <h2>{category ? category : null}</h2>
        <Link to="/reviews/write-review">
          <p className="button">Write a review as {currentUser.username}</p>
        </Link>
        <p>{isLoading ? 'Loading...' : null}</p>
        {/* TODO extract drop downs into components */}
        <div className="box">
          <div className="ReviewsList__sort-buttons">
            <select
              value={sortBy ? sortBy : ''}
              className="select"
              onChange={event => setSortBy(event.target.value)}
            >
              <option value="" defaultValue disabled>
                Sort Reviews
              </option>
              <option value="created_at">Date</option>
              <option value="comment_count">Number of Comments</option>
              <option value="votes">Votes</option>
            </select>
            <select
              className="select"
              value={order ? order : ''}
              onChange={event => setOrder(event.target.value)}
            >
              <option value="asc" defaultValue>
                Ascending
              </option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <p>{deleted ? 'Review Deleted' : null}</p>
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
              <div key={review_id} className="box">
                {owner === currentUser.username ? (
                  <ReviewDeleter
                    review_id={review_id}
                    setReviews={setReviews}
                    setDeleted={setDeleted}
                  />
                ) : null}
                <Link to={`/reviews/${review_id}`}>
                  <p>{title}</p>
                  <img
                    alt={title}
                    src={review_img_url}
                    height="200"
                    width="200"
                  />
                </Link>
                <Link to={`/users/${owner}`}>
                  <p>{owner}</p>
                </Link>
                <p>Votes: {votes}</p>
                <p>{err ? err : null}</p>
                <ReviewsListVoter
                  review_id={review_id}
                  incrementVotes={incrementVotes}
                  decrementVotes={decrementVotes}
                />
                <p>Comments: {comment_count}</p>
              </div>
            );
          }
        )}
        {bottomReached ? bottomReached : null}
      </div>
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
