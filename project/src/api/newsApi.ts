import axios from 'axios';
import { NewsResponse } from '../types/news';

const API_URL = 'http://localhost:3000/api/news';

export const fetchNews = async (page: number = 1): Promise<NewsResponse> => {
  const response = await axios.get(`${API_URL}/top-headlines`, {
    params: { page }
  });
  return response.data;
};