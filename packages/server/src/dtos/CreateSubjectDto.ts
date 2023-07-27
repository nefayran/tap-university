import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  divisionType: string;
}
