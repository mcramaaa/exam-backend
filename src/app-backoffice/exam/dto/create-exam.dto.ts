import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ example: 'Ujian SMA' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  isOneTime: boolean;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  isPackage: boolean;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  degree: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  start: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  end: string;

  @ApiProperty({ example: 3600 })
  @IsNotEmpty()
  time: string;
}
