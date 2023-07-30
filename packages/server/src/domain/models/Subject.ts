import { DivisionBasic } from './Division';
import { EntityBasic } from './Entity';

export class SubjectBasic implements EntityBasic {
  _id: string;
  title: string;
  division: DivisionBasic;
}
