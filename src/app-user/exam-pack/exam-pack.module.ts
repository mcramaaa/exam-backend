import { Module } from '@nestjs/common';
import { ExamPackService } from './exam-pack.service';
import { ExamPackController } from './exam-pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { ParticipantsModule } from 'src/app-backoffice/participants/participants.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamPackage]), ParticipantsModule],
  controllers: [ExamPackController],
  providers: [ExamPackService],
})
export class ExamPackModule {}
