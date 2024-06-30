import { Module } from '@nestjs/common';
import { ExamAnswerService } from './exam-answer.service';
import { ExamAnswerController } from './exam-answer.controller';

@Module({
  controllers: [ExamAnswerController],
  providers: [ExamAnswerService],
})
export class ExamAnswerModule {}
