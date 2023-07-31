import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDivisionDto } from 'src/dtos/CreateDivisionDto';
import { IdsQuery } from 'src/dtos/IdsQuery';
import IService from 'src/interfaces/IServiceBasic';
import { Division } from 'src/domain/schemas/Division';
import { UpdateDivisionDto } from 'src/dtos/UpdateDivisionDto';
import { uniqDivisionNameRuleCheck } from 'src/domain/rules/UniqDivisionNameRule';

@Injectable()
export class DivisionService implements IService {
  constructor(@InjectModel(Division.name) private DivisionModel: Model<Division>) {}

  async Get(query: IdsQuery) {
    // Get one/many by ID/s
    if (query.ids?.length > 0) {
      return await this.DivisionModel.find({
        _id: {
          $in: query.ids,
        },
      });
    }

    return this.DivisionModel.find();
  }

  async GetByTitle(title: string) {
    // Get one/many by title
    if (title.length > 0) {
      const result = await this.DivisionModel.findOne({ title: title });
      return result;
    }

    return null;
  }

  async Create(dto: CreateDivisionDto) {
    try {
      const errors = [];
      if (dto.divisions?.length > 0) {
        for (const division of dto.divisions) {
          const error = await uniqDivisionNameRuleCheck(this, division);
          error && errors.push(error);
          if (errors.length === 0) {
            // Create new division
            const createdDivision = new this.DivisionModel(division);
            await createdDivision.save();
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
          await this.DivisionModel.deleteOne({ _id: id });
        }
      });
    }

    return this.Get(query);
  }

  async Update(dto: UpdateDivisionDto) {
    const errors = await uniqDivisionNameRuleCheck(this, dto.division);
    if (!errors) {
      // Update Division
      await this.DivisionModel.findOneAndUpdate({ _id: dto.division._id }, { title: dto.division.title, available: dto.division.available });
    }

    return [errors, dto];
  }
}
