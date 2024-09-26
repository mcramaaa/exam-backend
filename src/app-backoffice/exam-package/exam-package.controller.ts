import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ExamPackageService } from './exam-package.service';
import { CreateExamPackageDto } from './dto/create-exam-package.dto';
import { UpdateExamPackageDto } from './dto/update-exam-package.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { ExamPackage } from 'src/database/entities/exam-package.entity';

@ApiTags('Exam-Package')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/exam-package',
  version: '1',
})
export class ExamPackageController {
  constructor(private examPackageService: ExamPackageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'id', required: false, example: 1 })
  @ApiQuery({ name: 'name', required: false, example: 'paket 1' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('id') id: number,
    @Query('name') name: string,
  ): Promise<PaginationResultType<ExamPackage>> {
    const [data, count] = await this.examPackageService.findManyWithPagination(
      {
        page,
        limit,
      },
      {
        name,
        id,
      },
    );
    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.examPackageService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createExamPackageDto: CreateExamPackageDto) {
    return this.examPackageService.create(createExamPackageDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateExamPackageDto: UpdateExamPackageDto,
  ) {
    return this.examPackageService.update(+id, updateExamPackageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.examPackageService.remove(+id);
  }
}
