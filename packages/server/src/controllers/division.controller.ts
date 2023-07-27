import { Body, Controller, Delete, Get, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common';
import { DivisionService } from '../services/Division.service';
// import { Division } from 'src/domain/schemas/Division';
import { CreateDivisionDto } from 'src/dtos/CreateDivisionDto';
import { IdsQuery } from 'src/dtos/GetDivisionQuery';
import IControllerBasic from 'src/interfaces/IControllerBasic';
import { UpdateDivisionDto } from 'src/dtos/UpdateDivisionDto';

@Controller('division')
export class DivisionController implements IControllerBasic {
  constructor(private readonly DivisionService: DivisionService) {}
  update: (payload: any) => Promise<any>;

  @Get()
  async get(@Query() query: IdsQuery) {
    return this.DivisionService.Get(query);
  }

  @Post()
  async post(@Body() createDivisionDto: CreateDivisionDto) {
    try {
      const [errors] = await this.DivisionService.Create(createDivisionDto);
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
    return this.DivisionService.Delete(query);
  }

  @Put()
  async put(@Body() updateDivisionDto: UpdateDivisionDto) {
    try {
      const [errors] = await this.DivisionService.Update(updateDivisionDto);
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
