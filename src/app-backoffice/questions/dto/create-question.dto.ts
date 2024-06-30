import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { QUESTIONSTYPE } from 'src/shared/enum/question-type.enum';

export class CreateQuestionDto {
  @ApiProperty({ example: 'Sebutkan' })
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: ['a', 'b', 'c'] })
  @IsNotEmpty()
  options: string;

  @ApiProperty({ example: 'a' })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  onTrue: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  onEmpty: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  onFalse: number;

  @ApiProperty({ example: QUESTIONSTYPE.MULTIPLE })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  package_id: number;
}

// export class CreateQuestionsDto {
//   @ApiProperty({ type: [CreateQuestionDto] })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateQuestionDto)
//   questions: CreateQuestionDto[];
// }

// export class CreateQuestionsDto {
//   @ApiProperty({ type: [CreateQuestionDto] })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateQuestionDto)
//   questions: CreateQuestionDto[];
// }
