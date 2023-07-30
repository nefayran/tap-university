import { Body, Controller, Delete, Get, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common';
import { UpdateSubjectDto } from 'out/models/dtos/UpdateSubjectDto';
import { CreateSubjectDto } from 'src/dtos/CreateSubjectDto';
import { IdsQuery } from 'src/dtos/IdsQuery';
import IControllerBasic from 'src/interfaces/IControllerBasic';
import { SubjectService } from 'src/services/subject.service';

@Controller('subject')
export class SubjectController implements IControllerBasic {
  constructor(private readonly SubjectService: SubjectService) {}

  @Get()
  async get(@Query() query: IdsQuery) {
    return this.SubjectService.Get(query);
  }

  @Get('getWithDivision')
  async getWithDivision(@Query() query: IdsQuery) {
    return this.SubjectService.GetWithDivision(query);
  }

  @Post()
  async post(@Body() createSubjectDto: CreateSubjectDto) {
    try {
      const [errors] = await this.SubjectService.Create(createSubjectDto);
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
    return this.SubjectService.Delete(query);
  }

  @Put()
  async update(@Body() updateSubjectDto: UpdateSubjectDto) {
    try {
      const [errors] = await this.SubjectService.Update(updateSubjectDto);
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
