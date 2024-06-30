import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDegreeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
