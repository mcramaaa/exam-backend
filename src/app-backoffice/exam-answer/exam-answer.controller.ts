import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamAnswerService } from './exam-answer.service';
import { CreateExamAnswerDto } from './dto/create-exam-answer.dto';
import { UpdateExamAnswerDto } from './dto/update-exam-answer.dto';

@Controller('exam-answer')
export class ExamAnswerController {
  constructor(private readonly examAnswerService: ExamAnswerService) {}

  @Post()
  create(@Body() createExamAnswerDto: CreateExamAnswerDto) {
    return this.examAnswerService.create(createExamAnswerDto);
  }

  @Get()
  findAll() {
    return this.examAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamAnswerDto: UpdateExamAnswerDto) {
    return this.examAnswerService.update(+id, updateExamAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examAnswerService.remove(+id);
  }
}
