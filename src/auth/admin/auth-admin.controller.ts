import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailLoginDto } from '../dto/email-login-auth.dto';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { SessionAdmin } from 'src/shared/decorators/admin.decorator';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';
import { NullableType } from 'src/shared/types/nullable.type';
import { Admins } from 'src/database/entities/admin.entity';

@ApiTags('Auth Admin')
@Controller({
  path: '/auth/admin',
  version: '1',
})
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  create(@Body() loginDto: EmailLoginDto) {
    return this.authAdminService.loginValidator(loginDto);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async admin(
    @SessionAdmin() user: Admins,
  ): Promise<OkResponse<NullableType<Admins>>> {
    return okTransform(await this.authAdminService.me(user.id));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionAdmin() user: Admins): Promise<OkResponse<void>> {
    return okTransform(await this.authAdminService.logout(user.id));
  }
}
