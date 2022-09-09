import { CITIES } from '../consts/cities.js';

export const getCity = (name: string) => CITIES.find((item) => item?.name === name);
