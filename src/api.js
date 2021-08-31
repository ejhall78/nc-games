import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-nc-games-ejhall78.herokuapp.com/api',
});

export const getReviews = async () => {
  const response = await api.get('/reviews');

  return response.data.reviews;
};
