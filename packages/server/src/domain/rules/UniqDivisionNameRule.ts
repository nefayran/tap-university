import { DivisionService } from 'src/services/Division.service';

export const uniqDivisionNameRuleCheck = async (
  service: DivisionService,
  title: string,
) => {
  const division = await service.GetByTitle(title);
  if (division?.length > 0) {
    console.log('Division already exists!');
    return `Division with title: ${title} already exists!`;
  }
  return null;
};
