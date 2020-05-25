import axios from 'axios';
import {
  baseUrl,
  SEK,
  USD,
  GBP,
  SGD,
} from '../const/rates';

export const getRates = async () => {
  try {
    const url = `${baseUrl}latest?base=${SEK}&symbols=${SGD},${USD},${GBP}`
    const { data: { rates, date } } = await axios(url);
    return { rates, date };
  } catch (e) {
		return { error: true };
	}
};

export const getRatesFromDate = async (date) => {
  try {
    const url = `${baseUrl}${date}?base=${SEK}&symbols=${SGD},${USD},${GBP}`
    const { data: { rates } } = await axios(url);
    return { rates };
  } catch (e) {
    return { error: true };
  }
}


