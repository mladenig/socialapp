import { User } from '../database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Position} from '../database/entities/position.entity';
import {CreatePositionDTO} from '../common/DTOs/positions/create-position.dto';
import {PositionDTO} from '../common/DTOs/positions/position.dto';
import {SystemError} from '../common/exceptions/system.error';

// Need validations
@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position) private readonly positionRepository: Repository<Position>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getAllPositions(): Promise<Position[]> {
    return  await this.positionRepository.find();
  }

  public async createPosition(position: CreatePositionDTO): Promise<Position> {

    const positionEntity: any = this.positionRepository.create(position);

    return await this.positionRepository.save(positionEntity);
  }

  public async deletePosition(positionId: number): Promise<PositionDTO> {
    const forDelete: Position  = await this.positionRepository.findOne({id: positionId});
    if (!forDelete) {
      throw new SystemError('Can\`t delete user');
    }
    forDelete.isDeleted = true;

    return await this.positionRepository.save(forDelete);
  }
}
