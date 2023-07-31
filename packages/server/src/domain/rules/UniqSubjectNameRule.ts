import { SubjectService } from 'src/services/Subject.service';
import { SubjectBasic } from '../models/Subject';

export const uniqSubjectNameRuleCheck = async (service: SubjectService, subject: SubjectBasic) => {
  // TODO: make uniq in division.
  const subjects = await service.GetByTitleAndDivision(subject.title, subject.division._id);
  if (subjects?.length > 0) {
    return `Subject with title: ${subject.title} already exists in this division!`;
  }
  return null;
};
