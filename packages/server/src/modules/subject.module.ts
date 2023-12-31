import { Module } from '@nestjs/common';
import { SubjectController } from '../controllers/subject.controller';
import { SubjectService } from '../services/subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from 'src/domain/schemas/Subject';
import { Division, DivisionSchema } from 'src/domain/schemas/Division';
/**
 * Module to make CRUD operations with "subjects" them.
 * Subjects example: English, Math, Science, Japanese, Geography/History
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Division.name, schema: DivisionSchema },
    ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
