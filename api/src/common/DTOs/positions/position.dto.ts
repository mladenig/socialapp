import {Publish} from '../../../transformer/decorators/publish';

export class PositionDTO {

    @Publish()
    public id: number;

    @Publish()
    public position: string;
}
