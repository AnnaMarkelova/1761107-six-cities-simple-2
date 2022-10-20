import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type';
import { GoodType } from '../../../types/good-type.enum';
import { Location } from '../../../types/location.type';

export default class OfferResponse {
  @Expose() public id!: string;

  @Expose() public title!: string;

  @Expose() public description!: string;

  @Expose() public city!: City;

  @Expose() public previewImage!: string;

  @Expose() public images!: string[];

  @Expose() public isPremium!: boolean;

  @Expose() public type!: string;

  @Expose() public bedrooms!: number;

  @Expose() public maxAdults!: number;

  @Expose() public price!: number;

  @Expose() public goods!: GoodType[];

  @Expose() public host!: string;

  @Expose() public location!: Location;

  @Expose() public rating!: number;
}
