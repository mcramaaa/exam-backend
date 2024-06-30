import { Injectable } from '@nestjs/common';
import { CreateExamAnswerDto } from './dto/create-exam-answer.dto';
import { UpdateExamAnswerDto } from './dto/update-exam-answer.dto';

@Injectable()
export class ExamAnswerService {
  create(createExamAnswerDto: CreateExamAnswerDto) {
    return 'This action adds a new examAnswer';
  }

  findAll() {
    return `This action returns all examAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examAnswer`;
  }

  update(id: number, updateExamAnswerDto: UpdateExamAnswerDto) {
    return `This action updates a #${id} examAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} examAnswer`;
  }
}
