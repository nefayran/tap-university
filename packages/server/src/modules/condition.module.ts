import { Module } from '@nestjs/common';
import { ConditionController } from '../controllers/Condition.controller';
import { ConditionService } from '../services/Condition.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Condition, ConditionSchema } from 'src/domain/schemas/Condition';
import { Division, DivisionSchema } from 'src/domain/schemas/Division';
import { Subject, SubjectSchema } from 'src/domain/schemas/Subject';
/**
 * Module to make CRUD operations with "Conditions" them.
 * Conditions example: SUM by DIVISION MORE THAN 160
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Condition.name, schema: ConditionSchema },
      { name: Division.name, schema: DivisionSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [ConditionController],
  providers: [ConditionService],
})
export class ConditionModule {}
