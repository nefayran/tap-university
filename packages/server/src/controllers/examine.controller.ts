import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalculateExamineDto } from 'src/dtos/CalculateExamineDto';
import IControllerBasic from 'src/interfaces/IControllerBasic';
import { ExamineService } from 'src/services/examine.service';

@Controller('Examine')
@ApiTags('Examine Controller')
export class ExamineController implements IControllerBasic {
  constructor(private readonly ExamineService: ExamineService) {}

  // TODO: POINTS TO IMPROVEMENTS:
  get: (payload: any) => Promise<any>;
  delete: (payload: any) => Promise<any>;
  update: (payload: any) => Promise<any>;

  @Post('calculate')
  async post(@Body() calculateExamineDto: CalculateExamineDto) {
    try {
      const [errors, dto] = await this.ExamineService.Calculate(calculateExamineDto);
      if ((errors as [])?.length > 0) {
        throw new UnprocessableEntityException({
          errorCode: 403,
          message: errors,
        });
      }
      return dto;
    } catch (error) {
      return error;
    }
  }
}
