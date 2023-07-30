import { DivisionBasic, SubjectBasic } from 'src/models';

export interface UpdateSubjectDto {
  subject: SubjectBasic & { division: DivisionBasic };
}
