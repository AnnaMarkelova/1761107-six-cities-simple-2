import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsObject,
} from 'class-validator';
import { CITIES } from '../../../consts/cities.js';
import { City } from '../../../types/city.type';
import { GoodType } from '../../../types/good-type.enum.js';
import { HotelType } from '../../../types/hotel-type.enum.js';
import { Location } from '../../../types/location.type';
import { ADULTS_MAX, ADULTS_MIN, BEDROOMS_MAX, BEDROOMS_MIN, DESCRIPTION_LENGTH_MAX, DESCRIPTION_LENGTH_MIN, FILENAME_LENGTH, IMAGES_COUNT, PRICE_MAX, PRICE_MIN, TITLE_LENGTH_MAX, TITLE_LENGTH_MIN } from '../consts.js';


export default class UpdateOfferDto {

  @MinLength(TITLE_LENGTH_MIN, { message: `Minimum title length must be ${TITLE_LENGTH_MIN}` })
  @MaxLength(TITLE_LENGTH_MAX, { message: `Maximum title length must be ${TITLE_LENGTH_MAX}` })
  public title?: string;

  @MinLength(DESCRIPTION_LENGTH_MIN, { message: `Minimum description length must be ${DESCRIPTION_LENGTH_MIN}` })
  @MaxLength(DESCRIPTION_LENGTH_MAX, { message: `Maximum description length must be ${DESCRIPTION_LENGTH_MAX}` })
  public description?: string;

  @IsEnum(CITIES, { message: 'City must be: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf' })
  public city?: City;

  @MaxLength(FILENAME_LENGTH, { message: 'Too short for field previewImage' })
  public previewImage?: string;

  @IsArray({ message: 'images must be an array' })
  @IsString({ each: true, message: 'images field must be an array of valid strings' })
  @ArrayMinSize(IMAGES_COUNT, { message: `Photos must be ${IMAGES_COUNT}` })
  @ArrayMaxSize(IMAGES_COUNT, { message: `Photos must be ${IMAGES_COUNT}` })
  public images?: string[];

  @IsBoolean()
  public isPremium?: boolean;

  @IsEnum(HotelType, { message: 'HotelType must be: Apartment, House, Room, Hotel' })
  public type?: HotelType;

  @IsInt({ message: 'bedrooms must be an integer' })
  @Min(BEDROOMS_MIN, { message: `Minimum bedrooms must be ${BEDROOMS_MIN}` })
  @Max(BEDROOMS_MAX, { message: `Maximum bedrooms must be ${BEDROOMS_MAX}` })
  public bedrooms?: number;

  @IsInt({ message: 'adults must be an integer' })
  @Min(ADULTS_MIN, { message: `Minimum adults must be ${ADULTS_MIN}` })
  @Max(ADULTS_MAX, { message: `Maximum adults must be ${ADULTS_MAX}` })
  public maxAdults?: number;

  @IsInt({ message: 'price must be an integer' })
  @Min(PRICE_MIN, { message: `Minimum price must be ${PRICE_MIN}` })
  @Max(PRICE_MAX, { message: `Maximum price must be ${PRICE_MAX}` })
  public price?: number;

  @IsArray({ message: 'goods must be an array' })
  @IsEnum(GoodType, { each: true, message: 'goods must be:Breakfast, AirConditioning, LaptopFriendlyWorkspace, BabySeat, Washer, Towels, Fridge' })
  public goods?: GoodType[];

  @IsMongoId({ message: 'host must be valid ID' })
  public host?: string;

  @IsObject({ message: 'location must be is valid' })
  public location?: Location;

}
