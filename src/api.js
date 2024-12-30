import axios from 'axios';

export const BASE_URL = 'https://credit-irr.vercel.app';

export const saveData = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};
