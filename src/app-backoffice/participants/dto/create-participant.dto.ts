import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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

  @ApiProperty({ example: 'qweqweqwe' })
  @IsNotEmpty()
  exam_package: string;

  @ApiProperty({ example: 'bejo@exam.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qweqweqwe' })
  @IsNotEmpty()
  password: string;
}
