import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from 'src/shared/transformers/lower-caser.transformer';

export class EmailLoginDto {
  @ApiProperty({ example: 'super@admin.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qweqweqwe' })
  @IsNotEmpty()
  password: string;
}
