import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from 'src/dtos/CreateSubjectDto';
import { IdsQuery } from 'src/dtos/IdsQuery';
import IService from 'src/interfaces/IServiceBasic';
import { Subject } from 'src/domain/schemas/Subject';
import { uniqSubjectNameRuleCheck } from 'src/domain/rules/UniqSubjectNameRule';
import { Division } from 'src/domain/schemas/Division';
import { UpdateSubjectDto } from 'src/dtos/UpdateSubjectDto';

@Injectable()
export class SubjectService implements IService {
  constructor(@InjectModel(Subject.name) private SubjectModel: Model<Subject>, @InjectModel(Division.name) private DivisionModel: Model<Division>) {}

  async Get(query: IdsQuery) {
    // Get one/many by ID/s
    if (query.ids?.length > 0) {
      return await this.SubjectModel.find({
        _id: {
          $in: query.ids,
        },
      });
    }

    return this.SubjectModel.find();
  }

  async GetWithDivision(query: IdsQuery) {
    let subjects = [];

    // Get one/many by ID/s
    if (query.ids?.length > 0) {
      subjects = await this.SubjectModel.find({
        _id: {
          $in: query.ids,
        },
      });
    }

    // Get all
    if (!query.ids || query.ids.length === 0) {
    }
    subjects = await this.SubjectModel.find();

    const result = [];
    for (const subject of subjects) {
      const division = await this.DivisionModel.findOne({
        _id: subject.divisionId,
      });
      result.push({ _id: subject._id, title: subject.title, division });
    }

    return result;
  }

  async GetByTitle(title: string) {
    // Get one/many by title
    if (title.length > 0) {
      const result = await this.SubjectModel.find({ title: title });
      return result as [];
    }

    return [];
  }

  async GetByTitleAndDivision(title: string, divisionId: string) {
    // Get one/many by title
    if (title.length > 0) {
      const result = await this.SubjectModel.find({ title, divisionId });
      return result as [];
    }

    return [];
  }

  async Create(dto: CreateSubjectDto) {
    try {
      const errors = [];
      if (dto.subjects?.length > 0) {
        for (const subject of dto.subjects) {
          const error = await uniqSubjectNameRuleCheck(this, subject);
          error && errors.push(error);
          if (errors.length === 0) {
            // Create new Subject
            const createdSubject = new this.SubjectModel({ title: subject.title, divisionId: subject.division._id });
            await createdSubject.save();
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
          await this.SubjectModel.deleteOne({ _id: id });
        }
      });
    }

    return this.Get(query);
  }

  async Update(dto: UpdateSubjectDto) {
    const errors = await uniqSubjectNameRuleCheck(this, dto.subject);
    if (!errors) {
      // Update Subject
      await this.SubjectModel.findOneAndUpdate({ _id: dto.subject._id }, { title: dto.subject.title, divisionId: dto.subject.division._id });
    }

    return [errors, dto];
  }
}
