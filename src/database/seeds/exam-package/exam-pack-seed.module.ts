import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { ExamPackageSeedService } from './exam-pack-seed.service';
import { Exam } from 'src/database/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamPackage, Exam])],
  providers: [ExamPackageSeedService],
  exports: [ExamPackageSeedService],
})
export class ExamPackageSeedModule {}
