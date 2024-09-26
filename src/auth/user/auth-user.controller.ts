import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  Get,
  UseGuards,
} from '@nestjs/common';
import { EmailLoginDto } from '../dto/email-login-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { Participants } from 'src/database/entities/participants.entity';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';

@ApiTags('Auth User')
@Controller({
  path: '/auth/user',
  version: '1',
})
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  create(@Body() loginDto: EmailLoginDto) {
    return this.authUserService.loginValidator(loginDto);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  async user(@SessionUser() user: Participants) {
    console.log(user);
    return this.authUserService.me(user.id);
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: Participants): Promise<OkResponse<void>> {
    return okTransform(await this.authUserService.logout(user.id));
  }
}
