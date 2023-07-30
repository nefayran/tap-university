import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DivisionBasic } from '../models/Division';

export type DivisionDocument = HydratedDocument<Division>;

@Schema()
export class Division extends DivisionBasic {
  @Prop()
  title: string;
}

export const DivisionSchema = SchemaFactory.createForClass(Division);
