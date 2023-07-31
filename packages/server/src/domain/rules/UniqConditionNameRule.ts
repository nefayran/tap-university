import { ConditionService } from 'src/services/Condition.service';
import { ConditionBasic } from '../models/Condition';

export const uniqConditionNameRuleCheck = async (service: ConditionService, condition: ConditionBasic) => {
  try {
    const existingCondition = await service.GetByTitle(condition.title);

    if (existingCondition && existingCondition._id == condition._id && existingCondition.title === condition.title) {
      return null;
    }

    if (existingCondition) {
      return `Condition with title: ${existingCondition.title} already exists!`;
    }
    return null;
  } catch (e) {
    return e;
  }
};
