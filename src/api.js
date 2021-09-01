import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-nc-games-ejhall78.herokuapp.com/api',
});

export const getReviews = async (category, sort_by, order) => {
  const response = await api.get('/reviews', {
    params: { category, sort_by, order },
  });

  return response.data.reviews;
};

export const getCategories = async () => {
  const res = await api.get('/categories');

  return res.data.categories;
};

export const getReviewById = async review_id => {
  const res = await api.get(`/reviews/${review_id}`);

  return res.data.review;
};

export const getCommentsById = async review_id => {
  const res = await api.get(`reviews/${review_id}/comments`);

  return res.data.comments;
};

export const getUser = async username => {
  const res = await api.get(`/users/${username}`);

  return res.data.user;
};

export const patchReviewVotes = async (review_id, votes) => {
  await api.patch(`/reviews/${review_id}`, { inc_votes: votes });
};

export const patchCommentVotes = async (comment_id, votes) => {
  await api.patch(`/comments/${comment_id}`, { inc_votes: votes });
};
