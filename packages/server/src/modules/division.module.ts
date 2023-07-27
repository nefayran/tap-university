import { Module } from '@nestjs/common';
import { DivisionController } from '../controllers/Division.controller';
import { DivisionService } from '../services/Division.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Division, DivisionSchema } from 'src/domain/schemas/Division';
/**
 * Module to make CRUD operations with "Divisions" them.
 * Divisions example: Common, Science, Humanities
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Division.name, schema: DivisionSchema }])],
  controllers: [DivisionController],
  providers: [DivisionService],
})
export class DivisionModule {}
