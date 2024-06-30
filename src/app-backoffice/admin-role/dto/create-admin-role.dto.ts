import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PERMISSIONS } from 'src/shared/enum/permissions.enum';

export class CreateAdminRoleDto {
  @ApiProperty({ example: 'Super Admin' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: Object.values(PERMISSIONS),
  })
  @IsNotEmpty()
  permissions: PERMISSIONS[];
}
