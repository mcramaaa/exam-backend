import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth-admin.module';

@Module({
  imports: [AuthAdminModule],
})
export class AuthModule {}
