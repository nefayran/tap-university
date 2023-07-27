import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from 'src/dtos/CreateSubjectDto';
import IService from 'src/interfaces/IServiceBasic';
import { Subject } from 'src/domain/schemas/Subject';

@Injectable()
export class SubjectService implements IService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<Subject>) {}

  async Get(ids: string[]) {
    const s: Subject = {
      divisionType: 'S',
      title: 'English',
    };
    return Promise.resolve([s]);
  }

  async Create(dto: CreateSubjectDto[]) {
    const createdSubject = new this.subjectModel(dto[0]);
    createdSubject.save();
    return Promise.resolve(dto);
  }

  async Delete(ids: string[]) {
    return Promise.resolve(ids);
  }
  async Update(object: Subject) {
    return Promise.resolve(object);
  }
}
