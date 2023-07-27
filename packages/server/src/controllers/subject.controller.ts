import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Subject } from 'src/domain/schemas/Subject';
import { CreateSubjectDto } from 'src/dtos/CreateSubjectDto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getSubjects(): Promise<Subject[]> {
    return await this.subjectService.Get([]);
  }

  @Post()
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.Create([createSubjectDto]);
  }
}
