import { IsNumber, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

const TEXT_LENGTH_MIN = 5;
const TEXT_LENGTH_MAX = 1024;

const RATING_MIN = 1;
const RATING_MAX = 5;

export default class CreateCommentDto {

  @IsString({ message: 'Comment text is required' })
  @Length(TEXT_LENGTH_MIN, TEXT_LENGTH_MAX, { message: `Minimum comment text length is ${TEXT_LENGTH_MIN}, maximum is ${TEXT_LENGTH_MAX}` })
  public text!: string;

  @IsNumber({}, { message: 'Rating is required' })
  @Min(RATING_MIN, { message: `Minimum rating must be ${RATING_MIN}` })
  @Max(RATING_MAX, { message: `Maximum rating must be ${RATING_MAX}` })
  public rating!: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}
