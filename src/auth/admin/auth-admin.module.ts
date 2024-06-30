import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AdminModule } from 'src/app-backoffice/admin/admin.module';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTAdminStrategy } from '../strategies/jwt-admin.strategy';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

@Module({
  imports: [
    AppCacheModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('auth.secret'),
        signOptions: {
          expiresIn: ConfigService.get('auth.sessionExpires'),
        },
      }),
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, JWTAdminStrategy, IsExist, IsNotExist],
})
export class AuthAdminModule {}
