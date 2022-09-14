import { City } from './city.type.js';
import { GoodType } from './good-type.enum.js';
import { HotelType } from './hotel-type.enum.js';
import { Location } from './location.type.js';
import { User } from './user.type.js';

export interface Hotel {
  id: string;
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: HotelType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: GoodType[];
  host: User;
  countComment: number;
  location: Location;
}
