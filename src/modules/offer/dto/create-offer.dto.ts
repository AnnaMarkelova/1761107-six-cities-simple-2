import { City } from '../../../types/city.type.js';
import { GoodType } from '../../../types/good-type.enum.js';
import { HotelType } from '../../../types/hotel-type.enum.js';
import { Location } from '../../../types/location.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: HotelType;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: GoodType[];
  public host!: string;
  public location!: Location;
}
