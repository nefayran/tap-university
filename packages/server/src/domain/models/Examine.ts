import { DivisionBasic } from './Division';
import { EntityBasic } from './Entity';
import { SubjectBasic } from './Subject';

export interface ExamineBasic extends EntityBasic {
  _id: string | number;
  division: DivisionBasic;
  result: 'Pass' | 'Fail' | null;
  [key: string]: string | number | SubjectBasic[] | DivisionBasic | null | undefined;
}
