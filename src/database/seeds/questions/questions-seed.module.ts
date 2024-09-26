import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionSeedService } from './questions-seed.service';
import { Questions } from 'src/database/entities/question.entity';
import { ExamPackage } from 'src/database/entities/exam-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, ExamPackage])],
  providers: [QuestionSeedService],
  exports: [QuestionSeedService],
})
export class QuestionSeedModule {}
