import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSeedService } from './exam-seed.service';
import { Exam } from 'src/database/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamSeedService],
  exports: [ExamSeedService],
})
export class ExamSeedModule {}
