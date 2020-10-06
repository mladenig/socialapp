import { IsString, IsNotEmpty, Length, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostDTO {

    @IsString()
    @Length(3, 200)
    @IsOptional()
    public title: string;

    @IsString()
    @Length(3, 2000)
    @IsOptional()
    public description: string;

    @IsBoolean()
    @IsOptional()
    public isPublic: boolean;
}
