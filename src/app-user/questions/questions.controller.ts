import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { Questions } from 'src/database/entities/question.entity';
import { customPagination } from 'src/shared/utils/pagination';

@ApiTags('Question')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@Controller({
  path: 'user/question',
  version: '1',
})
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'exam_package', required: false, example: 1 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('exam_package') examPackage: number,
  ): Promise<PaginationResultType<Questions>> {
    const [data, count] = await this.questionsService.findManyWithPagination(
      {
        page,
        limit,
      },
      {
        examPackage,
      },
    );
    return customPagination(data, count, { page, limit });
  }

  @Get('/package/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.questionsService.findByPackageId(+id);
  }
}
