import { ApiProperty } from '@nestjs/swagger';

export class CreateDivisionDto {
  @ApiProperty()
  divisions: { title: string }[];
}
