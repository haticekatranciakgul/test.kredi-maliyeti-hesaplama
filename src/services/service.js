import axios from 'axios';
import {BASE_URL} from '../api'


export const createTable = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/credits/create/table`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
