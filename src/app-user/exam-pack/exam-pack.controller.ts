import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ExamPackService } from './exam-pack.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { customPagination } from 'src/shared/utils/pagination';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { Participants } from 'src/database/entities/participants.entity';

@ApiTags('Exam packages')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@Controller({
  path: 'user/exam-package',
  version: '1',
})
export class ExamPackController {
  constructor(private readonly examPackService: ExamPackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @SessionUser() user: Participants,
  ): Promise<PaginationResultType<ExamPackage>> {
    console.log(user);
    const [data, count] = await this.examPackService.findManyWithPagination(
      {
        page,
        limit,
      },
      user,
    );
    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ExamPackage> {
    return this.examPackService.findOne({ id });
  }
}
