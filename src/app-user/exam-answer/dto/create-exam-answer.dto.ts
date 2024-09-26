import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateExamAnswerDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  participantId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  package_id: number;

  @ApiProperty({ example: 'a,b,-,c' })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty({
    example: [
      ['19:09', 'log ke 1'],
      ['19:15', 'log ke 2'],
    ],
    description: 'Array of logs with time and description',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  log: [string, string][];
}
