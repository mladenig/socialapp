import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateCommentDTO {

  @IsString()
  @IsNotEmpty()
  public content: string;
}
