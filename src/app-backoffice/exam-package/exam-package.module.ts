import { Module, forwardRef } from '@nestjs/common';
import { ExamPackageService } from './exam-package.service';
import { ExamPackageController } from './exam-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamModule } from '../exam/exam.module';
import { ExamPackage } from 'src/database/entities/exam-package.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPackage]),
    forwardRef(() => ExamModule),
  ],
  controllers: [ExamPackageController],
  providers: [ExamPackageService],
  exports: [ExamPackageService],
})
export class ExamPackageModule {}
