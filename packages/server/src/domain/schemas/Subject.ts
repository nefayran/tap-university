import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {
  @Prop()
  title: string;

  @Prop()
  divisionType: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
