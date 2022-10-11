import { GoodType } from '../../../types/good-type.enum';
import { HotelType } from '../../../types/hotel-type.enum';
import { Location } from '../../../types/location.type';

export default class UpdateOfferDto {

  public title?: string;
  public description?: string;
  public date?: Date;
  // public city!: City;
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: HotelType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public countComment?: number;
  public goods?: GoodType[];
  public host?: string;
  public location?: Location;

}
