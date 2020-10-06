import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import {Position} from '../database/entities/position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Position]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionModule {}
