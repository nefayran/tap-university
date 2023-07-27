import { ApiProperty } from '@nestjs/swagger';

export class IdsQuery {
  @ApiProperty()
  ids: string[];
}
