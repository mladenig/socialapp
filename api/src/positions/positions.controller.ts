
import { Controller, Post, Body, Param, UseGuards, Delete, Get, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import {PositionDTO} from '../common/DTOs/positions/position.dto';
import {DeleteResult} from 'typeorm';
import {PositionsService} from './positions.service';
import {Position} from '../database/entities/position.entity';
import {CreatePositionDTO} from '../common/DTOs/positions/create-position.dto';

@Controller('positions')
export class PositionsController {

  constructor(private readonly commentService: PositionsService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(PositionDTO))
  public async getPositions(): Promise<Position[]> {
    return await this.commentService.getAllPositions();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(PositionDTO))
  public async createPositions(
    @Body() position: CreatePositionDTO,
  ): Promise<PositionDTO> {
    return await this.commentService.createPosition(position);
  }

  @Delete('/:positionId')
  @UseGuards(AuthGuard('jwt'))
  public async deletePositions(
    @Param('positionId') positionId: number,
  ): Promise<PositionDTO> {
    return await this.commentService.deletePosition(positionId);
  }
}
