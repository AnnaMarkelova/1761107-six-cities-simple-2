import crypto from 'crypto';
import { CITIES } from '../consts/cities.js';
import { GoodType } from '../types/good-type.enum.js';
import { HotelType } from '../types/hotel-type.enum.js';
import { Hotel } from '../types/hotel.type.js';
import { UserType } from '../types/user-type.enum.js';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';

export const getCity = (name: string) => CITIES.find((item) => item?.name === name);

export const createHotel = (row: string) => {

  const tokens = row.replace('\n', '').split('\t');
  const [id, title, description, date, city, previewImage, images, isPremium,
    rating, type, bedrooms, maxAdults, price, goods, idHost, nameHost, emailHost,
    avatarUrlHost, typeUserHost, countComment, latitude, longitude] = tokens;

  return {
    id: id,
    title,
    description,
    date: new Date(date),
    city: getCity(city),
    previewImage,
    images: images.split(';'),
    isPremium: Number(isPremium) === 1,
    rating: Number(rating),
    type: Object.keys(HotelType)[Object.values(HotelType).indexOf(type as unknown as HotelType)],
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';').map((item) => Object.keys(GoodType)[Object.values(GoodType).indexOf(item as unknown as GoodType)]),
    host: {
      id: idHost,
      name: nameHost,
      email: emailHost,
      avatarUrl: avatarUrlHost,
      typeUser: Object.keys(UserType)[Object.values(UserType).indexOf(typeUserHost as unknown as UserType)]
    },
    countComment: Number(countComment),
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
  } as Hotel;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
