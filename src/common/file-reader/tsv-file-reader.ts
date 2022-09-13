import { readFileSync } from 'fs';
import { GoodType } from '../../types/good-type.enum.js';
import { HotelType } from '../../types/hotel-type.enum.js';
import { Hotel } from '../../types/hotel.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { getCity } from '../../utils/utills.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Hotel[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData.
      split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([id, title, description, date, city, previewImage, images, isPremium, rating, type, bedrooms, maxAdults, price, goods, idHost, nameHost, emailHost, avatarUrlHost, typeUserHost,  countComment, latitude, longitude]) => ({
        id: Number(id),
        title,
        description,
        date: new Date(date),
        city: getCity(city),
        previewImage,
        images: images.split(';'),
        isPremium: Number(isPremium) === 1,
        rating: Number(rating),
        type: HotelType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        bedrooms: Number(bedrooms),
        maxAdults: Number(maxAdults),
        price: Number(price),
        goods: goods.split(';').map((item) => GoodType[item as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
        host: {id: Number(idHost), name: nameHost, email: emailHost, avatarUrl: avatarUrlHost, typeUser: UserType[typeUserHost as 'Normal' | 'Pro']},
        countComment: Number(countComment),
        location: {latitude : Number(latitude), longitude: Number(longitude)},
      }));
  }
}

