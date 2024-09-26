import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmailLoginDto } from '../dto/email-login-auth.dto';
import authConfig from 'src/shared/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { ParticipantsService } from 'src/app-backoffice/participants/participants.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/core/cache/cache.service';
import { ErrorException } from 'src/shared/exception/error.exception';
import { formatString } from 'src/shared/utils/string';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { compare } from 'bcrypt';
import { NullableType } from 'src/shared/types/nullable.type';
import { Participants } from 'src/database/entities/participants.entity';

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private participantService: ParticipantsService,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  async loginValidator(loginDto: EmailLoginDto) {
    const user = await this.participantService.findOne({
      email: loginDto.email,
    });
    if (!user) {
      throw new ErrorException(
        {
          email: 'Email not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const comparePassword = compare(loginDto.password, user.password);

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
      access: 'user',
    });

    try {
      await this.cacheService.set(
        formatString(CACHE_KEY_AUTH.SESSION, user.id),
        true,
        parseTimeToSeconds(this.config.sessionExpires),
      );
    } catch (error) {
      throw new error();
    }

    return { token, user };
  }

  async me(id: string): Promise<NullableType<Participants>> {
    console.log(id);
    const user = await this.participantService.findOne({ id });
    console.log(user);
    return user;
  }

  async logout(id: string): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, id));
  }
}
