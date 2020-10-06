import {
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UserLoginDTO {

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  username: any;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  password: string;

}
