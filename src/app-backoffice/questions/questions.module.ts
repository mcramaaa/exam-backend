import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { Questions } from 'src/database/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, ExamPackage])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
