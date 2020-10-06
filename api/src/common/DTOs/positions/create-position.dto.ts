import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class CreatePositionDTO {
    @IsString()
    @IsNotEmpty()
    public position: string;
}
