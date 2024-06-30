import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UseGuards,
  UploadedFiles,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { MulterOptions } from 'src/shared/utils/multer.utils';
import { Questions } from 'src/database/entities/question.entity';

@ApiTags('Question')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'question',
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Buat pertanyaan baru' })
  @ApiResponse({ status: 201, description: 'Pertanyaan berhasil dibuat.' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'imgs', maxCount: 100 }],
      MulterOptions('question-imgs'),
    ),
  )
  async create(
    @Body('questions') questions: string,
    @UploadedFiles() files: { imgs?: Express.Multer.File[] },
  ) {
    const data = JSON.parse(questions); // Parse 'questions' menjadi objek JavaScript
    console.log(data);
    console.log(files);
    return await this.questionsService.create(data, files.imgs);
  }

  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [{ name: 'imgs', maxCount: 100 }],
  //     MulterOptions('question-imgs'),
  //   ),
  // )
  // async create(
  //   @Body('questions') questions: string,
  //   @UploadedFiles() files: { imgs?: Express.Multer.File[] },
  // ) {
  //   console.log(files);
  //   const data = JSON.parse(questions);
  //   return await this.questionsService.create(data, files.imgs);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.questionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  // ) {
  //   return this.questionsService.update(+id, updateQuestionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
