import { IsString, IsNotEmpty, Length, IsNumber, IsBoolean } from 'class-validator';

export class CreatePostDTO {

    @IsString()
    @IsNotEmpty()
    @Length(3, 200)
    public title: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 2000)
    public description: string;

    @IsString()
    @IsNotEmpty()
    public img: string;

    @IsBoolean()
    @IsNotEmpty()
    public isPublic: boolean;
}
