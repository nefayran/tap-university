import { Body, Controller, Delete, Get, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdsQuery } from 'src/dtos/IdsQuery';
import IControllerBasic from 'src/interfaces/IControllerBasic';
import { CreateConditionDto, UpdateConditionDto } from 'src/models';
import { ConditionService } from 'src/services/Condition.service';

@Controller('condition')
@ApiTags('Condition Controller')
export class ConditionController implements IControllerBasic {
  constructor(private readonly ConditionService: ConditionService) {}

  @Get('getTypes')
  async getTypes() {
    return this.ConditionService.GetTypes();
  }

  @Get('getOperators')
  async getOperators() {
    return this.ConditionService.GetOperators();
  }

  @Get()
  async get(@Query() query: IdsQuery) {
    return this.ConditionService.Get(query);
  }

  @Post()
  async post(@Body() createConditionDto: CreateConditionDto) {
    try {
      const [errors] = await this.ConditionService.Create(createConditionDto);
      if ((errors as [])?.length > 0) {
        throw new UnprocessableEntityException({
          errorCode: 403,
          message: errors,
        });
      }
    } catch (error) {
      return error;
    }
  }

  @Delete()
  async delete(@Query() query: IdsQuery) {
    return this.ConditionService.Delete(query);
  }

  @Put()
  async update(@Body() updateConditionDto: UpdateConditionDto) {
    try {
      const [errors] = await this.ConditionService.Update(updateConditionDto);
      if (errors) {
        throw new UnprocessableEntityException({
          errorCode: 403,
          message: errors,
        });
      }
    } catch (error) {
      return error;
    }
  }
}
