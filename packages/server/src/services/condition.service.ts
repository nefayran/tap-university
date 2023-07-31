import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdsQuery } from 'src/dtos/IdsQuery';
import IService from 'src/interfaces/IServiceBasic';
import { Division } from 'src/domain/schemas/Division';
import { Condition } from 'src/domain/schemas/Condition';
import { CreateConditionDto } from 'src/dtos/CreateConditionDto';
import { uniqConditionNameRuleCheck } from 'src/domain/rules/UniqConditionNameRule';
import { UpdateConditionDto } from 'src/models';

@Injectable()
export class ConditionService implements IService {
  constructor(
    @InjectModel(Condition.name) private ConditionModel: Model<Condition>,
    @InjectModel(Division.name) private DivisionModel: Model<Division>,
  ) {}

  async Get(query: IdsQuery) {
    // Get one/many by ID/s
    if (query.ids?.length > 0) {
      return await this.ConditionModel.find({
        _id: {
          $in: query.ids,
        },
      });
    }

    return this.ConditionModel.find();
  }

  // TODO: POINT FOR IMPROVEMENTS - MOVE TO DATABASE
  async GetTypes() {
    return ['SUM', 'DIFF'];
  }

  // TODO: POINT FOR IMPROVEMENTS - MOVE TO DATABASE
  async GetOperators() {
    return ['MORE', 'LESS'];
  }

  async GetByTitle(title: string) {
    // Get one/many by title
    if (title.length > 0) {
      const result = await this.ConditionModel.findOne({ title: title });
      return result;
    }

    return null;
  }

  async Create(dto: CreateConditionDto) {
    try {
      const errors = [];
      if (dto.conditions?.length > 0) {
        for (const condition of dto.conditions) {
          const error = await uniqConditionNameRuleCheck(this, condition);
          error && errors.push(error);
          if (errors.length === 0) {
            // Create new Condition
            const createdCondition = new this.ConditionModel(condition);
            await createdCondition.save();
          }
        }
      }
      return [errors, dto];
    } catch (error) {
      throw error;
    }
  }

  async Delete(query: IdsQuery) {
    // Get one/many by ID/s
    if (query.ids?.length > 0) {
      query.ids.forEach(async (id) => {
        const d = this.Get({ ids: [id] });
        if (d) {
          await this.ConditionModel.deleteOne({ _id: id });
        }
      });
    }

    return this.Get(query);
  }

  async Update(dto: UpdateConditionDto) {
    const errors = await uniqConditionNameRuleCheck(this, dto.condition);
    if (!errors) {
      // Update Condition
      await this.ConditionModel.findOneAndUpdate(
        { _id: dto.condition._id },
        {
          title: dto.condition.title,
          type: dto.condition.type,
          groupBy: dto.condition.groupBy,
          operator: dto.condition.operator,
          value: dto.condition.value,
        },
      );
    }

    return [errors, dto];
  }
}
