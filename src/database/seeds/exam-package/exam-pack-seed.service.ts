import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { Exam } from 'src/database/entities/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamPackageSeedService {
  constructor(
    @InjectRepository(ExamPackage)
    private repository: Repository<ExamPackage>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const exam = await this.examRepository.findOne({ where: { id: 1 } });

      if (exam) {
        await this.repository.save(
          this.repository.create({
            name: 'Paket 1',
            exam: exam,
          }),
        );
        await this.repository.save(
          this.repository.create({
            name: 'Paket 2',
            exam: exam,
          }),
        );
      } else {
        console.error('Exam dengan ID 1 tidak ditemukan');
      }
    }
  }
}
