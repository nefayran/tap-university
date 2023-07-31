import { EntityBasic } from './Entity';

export class ConditionBasic implements EntityBasic {
  _id: string;
  title: string;
  type: 'SUM' | 'DIFF';
  groupBy: string; // Division/Subject/any other
  operator: 'MORE' | 'LESS';
  value: number;
}
