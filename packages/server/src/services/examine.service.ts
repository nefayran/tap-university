import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import IService from 'src/interfaces/IServiceBasic';
import { Examine } from 'src/domain/schemas/Examine';
import { CalculateExamineDto, ConditionBasic, ExamineBasic } from 'src/models';
import { Condition } from 'src/domain/schemas/Condition';
import { Division } from 'src/domain/schemas/Division';
import { Subject } from 'src/domain/schemas/Subject';

@Injectable()
export class ExamineService implements IService {
  constructor(
    @InjectModel(Examine.name) private ExamineModel: Model<Examine>,
    @InjectModel(Condition.name) private ConditionModel: Model<Condition>,
    @InjectModel(Division.name) private DivisionModel: Model<Division>,
    @InjectModel(Subject.name) private SubjectModel: Model<Subject>,
  ) {}

  // TODO: POINTS TO IMPROVEMENTS:
  Get: (payload: any) => Promise<any>;
  Create: (payload: any) => Promise<any>;
  Delete: (payload: any) => Promise<any>;
  Update: (payload: any) => Promise<any>;

  async decryptTable(examine: ExamineBasic) {
    const conditions = [];
    const subjects = [];

    for (const key of Object.keys(examine)) {
      const column = examine[key];
      if (mongoose.Types.ObjectId.isValid(key)) {
        // const keys = [key.toString()];
        const subject = await this.SubjectModel.findById(key);
        if (subject) {
          subjects.push({ _id: subject._id, division: { _id: subject.divisionId }, score: Number(column) });
        }
        const condition = await this.ConditionModel.findById(key);
        if (condition) {
          conditions.push(condition);
        }
      }
    }

    return [conditions, subjects];
  }

  async Calculate(dto: CalculateExamineDto) {
    try {
      for (const examine of dto.examines) {
        const [conditions, subjects] = await this.decryptTable(examine);

        const conditionsResults: Array<boolean> = [];

        // Apply conditions
        conditions.forEach((condition: ConditionBasic) => {
          let applyData = [];
          let finalScore = 0;
          let result = false;
          examine[condition._id] = null;

          // Apply condition group by
          applyData = subjects.filter((s) => {
            return s.division._id == condition.groupBy;
          });

          // Exclude not relevant division
          if (condition.groupBy !== examine.division._id && condition.groupBy !== 'all') {
            return;
          }

          if (condition.groupBy === 'all') {
            applyData = subjects;
          }

          // Apply condition type
          if (condition.type === 'SUM') {
            applyData.forEach((subject) => {
              finalScore += subject.score;
            });
          }

          if (condition.type === 'DIFF') {
            applyData.forEach((subject) => {
              finalScore -= subject.score;
            });
          }

          // Calculate final result, apply condition operator and value
          if (condition.operator === 'MORE') {
            result = finalScore >= condition.value;
          }

          if (condition.operator === 'LESS') {
            result = finalScore <= condition.value;
          }

          conditionsResults.push(result);
          examine[condition._id] = finalScore;
        });

        const finalResult = conditionsResults.length > 0 && conditionsResults.indexOf(false) == -1;

        examine.result = finalResult ? 'Pass' : 'Fail';
      }
      const errors = [];
      return [errors, dto];
    } catch (err) {
      return err;
    }
  }
}
