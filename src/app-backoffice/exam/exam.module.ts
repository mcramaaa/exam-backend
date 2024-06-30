import { Module, forwardRef } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/database/entities/exam.entity';
import { DegreeModule } from '../degree/degree.module';
import { ExamPackageModule } from '../exam-package/exam-package.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    DegreeModule,
    forwardRef(() => ExamPackageModule),
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
