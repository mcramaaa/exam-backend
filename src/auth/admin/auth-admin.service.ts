import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmailLoginDto } from '../dto/email-login-auth.dto';
import { LoginResponseType } from 'src/shared/types/auth/login-response.type';
import { AdminService } from 'src/app-backoffice/admin/admin.service';
import { ErrorException } from 'src/shared/exception/error.exception';
import { compare } from 'src/shared/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/core/cache/cache.service';
import { formatString } from 'src/shared/utils/string';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import authConfig from 'src/shared/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { NullableType } from 'src/shared/types/nullable.type';
import { Admins } from 'src/database/entities/admin.entity';

@Injectable()
export class AuthAdminService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private adminService: AdminService,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  async loginValidator(
    login: EmailLoginDto,
  ): Promise<LoginResponseType<Admins>> {
    const user = await this.adminService.findOne({
      email: login.email,
    });

    if (!user) {
      throw new ErrorException(
        {
          email: 'Email not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const comparePassword = compare(login.password, user.password);

    if (!comparePassword) {
      throw new ErrorException(
        {
          password: 'Wrong password',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      access: 'admin',
    });

    try {
      await this.cacheService.set(
        formatString(CACHE_KEY_AUTH.SESSION, user.id),
        true,
        parseTimeToSeconds(this.config.sessionExpires ?? '1h'),
      );
    } catch (error) {
      throw new error();
    }

    return { token, user };
  }

  async me(id: number): Promise<NullableType<Admins>> {
    return this.adminService.findOne({ id });
  }

  async logout(id: number): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, id));
  }
}
