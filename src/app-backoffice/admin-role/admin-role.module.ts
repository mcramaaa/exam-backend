import { Module } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { AdminRoleController } from './admin-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from 'src/database/entities/admin-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRole])],
  providers: [AdminRoleService],
  controllers: [AdminRoleController],
  exports: [AdminRoleService],
})
export class AdminRoleModule {}
