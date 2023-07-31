import { DivisionService } from 'src/services/division.service';
import { DivisionBasic } from '../models/Division';

export const uniqDivisionNameRuleCheck = async (service: DivisionService, division: DivisionBasic) => {
  try {
    const existingDivision = await service.GetByTitle(division.title);

    if (existingDivision && existingDivision._id == division._id && existingDivision.title === division.title) {
      return null;
    }

    if (existingDivision) {
      return `Division with title: ${existingDivision.title} already exists!`;
    }
    return null;
  } catch (e) {
    return e;
  }
};
