import { Module } from '@nestjs/common';
import { ExamineController } from '../controllers/Examine.controller';
import { ExamineService } from '../services/Examine.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Examine, ExamineSchema } from 'src/domain/schemas/Examine';
import { Division, DivisionSchema } from 'src/domain/schemas/Division';
import { Subject, SubjectSchema } from 'src/domain/schemas/Subject';
import { Condition, ConditionSchema } from 'src/domain/schemas/Condition';
/**
 * Module to make CRUD operations with "Examines" them.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Examine.name, schema: ExamineSchema },
      { name: Condition.name, schema: ConditionSchema },
      { name: Division.name, schema: DivisionSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [ExamineController],
  providers: [ExamineService],
})
export class ExamineModule {}
