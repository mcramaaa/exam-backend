import { Module } from '@nestjs/common';
import { ExamAnswerService } from './exam-answer.service';
import { ExamAnswerController } from './exam-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAnswers } from 'src/database/entities/exam-answer.entity';
import { ParticipantsModule } from 'src/app-backoffice/participants/participants.module';
import { Participants } from 'src/database/entities/participants.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamAnswers, Participants]),
    ParticipantsModule,
  ],
  controllers: [ExamAnswerController],
  providers: [ExamAnswerService],
})
export class ExamAnswerModule {}
