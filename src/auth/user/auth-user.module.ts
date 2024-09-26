import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { ParticipantsModule } from 'src/app-backoffice/participants/participants.module';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTUserStrategy } from '../strategies/jwt-user.strategy';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

@Module({
  imports: [
    AppCacheModule,
    ParticipantsModule,
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
  controllers: [AuthUserController],
  providers: [AuthUserService, JWTUserStrategy, IsExist, IsNotExist],
})
export class AuthUserModule {}
