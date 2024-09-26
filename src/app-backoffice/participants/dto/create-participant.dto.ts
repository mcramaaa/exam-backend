import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Bejo' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1999-01-01' })
  @IsNotEmpty()
  birth: string;

  @ApiProperty({ example: [1, 2] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  exam_package: string[];

  @ApiProperty({ example: 'bejo@exam.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qweqweqwe' })
  @IsNotEmpty()
  password: string;
}
