import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';
import { GoodType } from '../../types/good-type.enum.js';
import { HotelType } from '../../types/hotel-type.enum.js';
import { Location } from '../../types/location.type.js';
import { UserEntity } from '../user/user.entity.js';

const TITLE_LENGTH_MIN = 1;
const TITLE_LENGTH_MAX = 100;

const DESCRIPTION_LENGTH_MIN = 20;
const DESCRIPTION_LENGTH_MAX = 1024;

const RATING_MIN = 1;
const RATING_MAX = 8;

const ADULTS_MIN = 1;
const ADULTS_MAX = 10;

const PRICE_MIN = 100;
const PRICE_MAX = 100000;

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: [TITLE_LENGTH_MIN, 'Min length for title is 1'],
    maxlength: [TITLE_LENGTH_MAX, 'Max length for title is 100']
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: [DESCRIPTION_LENGTH_MIN, 'Min length for title is 20'],
    maxlength: [DESCRIPTION_LENGTH_MAX, 'Max length for title is 1024']
  })
  public description!: string;

  @prop({
    required: true,
  })
  public date!: Date;

  @prop({
    required: true
  })
  public city!: City;

  @prop({
    required: true
  })
  public previewImage!: string;

  @prop({
    type: String,
    required: true
  })
  public images!: string[];

  @prop({
    required: true,
    default: false
  })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({
    required: true,
    // type: () => String,
    // enum: HotelType
    enum: ['Apartment', 'House', 'Room', 'Hotel']
  })
  public type!: HotelType;


  @prop({
    required: true,
    min:RATING_MIN,
    max:RATING_MAX
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min:ADULTS_MIN,
    max:ADULTS_MAX
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min:PRICE_MIN,
    max:PRICE_MAX
  })
  public price!: number;

  @prop({
    required: true,
  })
  public countComment!: number;

  @prop({
    required: true,
    type: String,
    default: [],
  })
  public goods!: GoodType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public host!: Ref<UserEntity>;

  @prop({ required: true })
  public location!: Location;

}

export const OfferModel = getModelForClass(OfferEntity);
