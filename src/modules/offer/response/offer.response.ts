import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.type.js';
import { GoodType } from '../../../types/good-type.enum.js';
import { Location } from '../../../types/location.type';
import UserResponse from '../../user/response/user.response.js';

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

  @Expose({ name: 'host' })
  @Type(() => UserResponse)
  public host!: UserResponse;

  @Expose() public location!: Location;

  @Expose() public rating!: number;
}
