import axios from 'axios';
import indexApi from './indexApi';

export const getGoldPrediction = async (range) => {
    //30d / day / 10d
    const response = await axios.get(`http://127.0.0.1:8000/predict_${range}`);
    return response.data;
};