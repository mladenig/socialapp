import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { Position } from '../../../database/entities/position.entity';

export class UpdateUserDTO {

  @IsString()
  @IsNotEmpty()
  @Optional()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  public email?: string;

  @IsString()
  @Optional()
  public bio?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  public position?: Position;

  @Optional()
  public profilePic?: string;
}
