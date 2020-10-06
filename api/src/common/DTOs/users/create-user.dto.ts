import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional, Length, MaxLength,
} from 'class-validator';
import { Position } from '../../../database/entities/position.entity';

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  public password: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 50)
  public email: string;
}
