import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ExamAnswerService } from './exam-answer.service';
import { CreateExamAnswerDto } from './dto/create-exam-answer.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { ExamAnswers } from 'src/database/entities/exam-answer.entity';
import { customPagination } from 'src/shared/utils/pagination';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { Participants } from 'src/database/entities/participants.entity';

@ApiTags('Answer')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@Controller({
  path: 'user/answer',
  version: '1',
})
export class ExamAnswerController {
  constructor(private readonly examAnswerService: ExamAnswerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @SessionUser() user: Participants,
  ): Promise<PaginationResultType<ExamAnswers>> {
    const [data, count] = await this.examAnswerService.findManyWithPagination(
      {
        page,
        limit,
      },
      user,
    );
    return customPagination(data, count, { page, limit });
  }

  @Post()
  create(@Body() payload: CreateExamAnswerDto) {
    return this.examAnswerService.create(payload);
  }

  @Patch()
  update(@Body() payload: CreateExamAnswerDto) {
    return this.examAnswerService.create(payload);
  }
  @Get(':id/logs')
  async getLogs(@Param('id') id: string) {
    const examAnswer = await this.examAnswerService.findOne(+id);
    if (examAnswer) {
      return JSON.parse(examAnswer.log);
    }
    throw new NotFoundException('Exam answer not found');
  }
}
