import axios from 'axios';

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const saveData = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, payload);
    return response.data;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};
