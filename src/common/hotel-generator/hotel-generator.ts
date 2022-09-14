import dayjs from 'dayjs';
import { GoodType } from '../../types/good-type.enum.js';
import { HotelType } from '../../types/hotel-type.enum.js';
import { MockHotelData } from '../../types/mock-hotel-data.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems, guidGenerator } from '../../utils/random.js';
import { HotelGeneratorInterface } from './hotel-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COUNT = 1;
const MAX_COUNT = 5;

const MIN_STATUS = 0;
const MAX_STATUS = 1;

export default class HotelGenerator implements HotelGeneratorInterface {
  constructor(private readonly mockData: MockHotelData) { }

  public generate(): string {
    const id = guidGenerator();
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = generateRandomValue(MIN_STATUS, MAX_STATUS).toString();
    const rating = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();
    const type = getRandomItem([HotelType.Apartment, HotelType.House, HotelType.Room, HotelType.Hotel]);
    const bedrooms = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();
    const maxAdults = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems([GoodType.AirConditioning, GoodType.BabySeat, GoodType.Breakfast,
      GoodType.Fridge, GoodType.LaptopFriendlyWorkspace, GoodType.Towels, GoodType.Washer]).join(';');
    const idHost = guidGenerator();
    const nameHost = getRandomItem<string>(this.mockData.nameHosts);
    const emailHost = getRandomItem<string>(this.mockData.emailHosts);
    const avatarUrlHost = getRandomItem<string>(this.mockData.avatarUrlHosts);
    const typeUserHost = getRandomItem([UserType.Normal, UserType.Pro]);
    const countComment = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();
    const latitude = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();
    const longitude = generateRandomValue(MIN_COUNT, MAX_COUNT).toString();

    return [
      id, title, description,
      date, city, previewImage,
      images, isPremium, rating,
      type, bedrooms, maxAdults,
      price, goods, idHost,
      nameHost, emailHost, avatarUrlHost,
      typeUserHost,  countComment, latitude,
      longitude
    ].join('\t');
  }
}
