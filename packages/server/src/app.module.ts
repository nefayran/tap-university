import { Module } from '@nestjs/common';
import { SubjectModule } from './modules/subject.module';
import { DivisionModule } from './modules/division.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConditionModule } from './modules/condition.module';
import { ExamineModule } from './modules/examine.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'), SubjectModule, DivisionModule, ConditionModule, ExamineModule],
})
export class AppModule {}
