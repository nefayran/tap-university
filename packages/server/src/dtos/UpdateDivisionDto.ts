import { ApiProperty } from '@nestjs/swagger';

export class UpdateDivisionDto {
  @ApiProperty()
  division: { _id: string; title: string };
}
