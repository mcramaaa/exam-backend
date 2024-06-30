// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRoleModule } from '../admin-role/admin-role.module';
import { Admins } from 'src/database/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admins]), AdminRoleModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
