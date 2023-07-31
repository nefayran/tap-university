import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ConditionBasic } from '../models/Condition';

export type ConditionDocument = HydratedDocument<Condition>;

@Schema()
export class Condition extends ConditionBasic {
  @Prop()
  title: string;

  @Prop()
  type: 'SUM' | 'DIFF';

  @Prop()
  groupBy: string; // Division/Subject/any other

  @Prop()
  operator: 'MORE' | 'LESS';

  @Prop()
  value: number;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
