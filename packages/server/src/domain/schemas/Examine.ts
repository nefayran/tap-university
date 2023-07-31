import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DivisionBasic } from '../models/Division';

export type ExamineDocument = HydratedDocument<Examine>;

@Schema()
export class Examine {
  @Prop()
  result: 'Pass' | 'Fail' | null;

  @Prop()
  division: DivisionBasic;

  @Prop()
  raw: []; // Raw examine table
}

export const ExamineSchema = SchemaFactory.createForClass(Examine);
