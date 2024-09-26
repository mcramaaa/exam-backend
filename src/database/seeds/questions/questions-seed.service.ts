import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { Questions } from 'src/database/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionSeedService {
  constructor(
    @InjectRepository(Questions)
    private repository: Repository<Questions>,
    @InjectRepository(ExamPackage)
    private examPackageRepository: Repository<ExamPackage>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const examPackageOne = await this.examPackageRepository.findOne({
        where: { id: 1 },
      });
      if (examPackageOne) {
        await this.repository.save([
          this.repository.create({
            question: 'Paket 1 Pertanyaan 1',
            options: 'Opsi A, Opsi B, Opsi C, Opsi D',
            answer: 'Opsi A',
            onTrue: 100,
            onEmpty: 0,
            onFalse: 0,
            img: null,
            type: 'multiple',
            exam_Package: examPackageOne,
          }),
          this.repository.create({
            question: 'Paket 1 Pertanyaan 2',
            options: null,
            answer: 'Opsi A',
            onTrue: 100,
            onEmpty: 0,
            onFalse: 0,
            img: null,
            type: 'essay',
            exam_Package: examPackageOne,
          }),
        ]);
      }

      const examPackageTwo = await this.examPackageRepository.findOne({
        where: { id: 2 },
      });
      if (examPackageTwo) {
        await this.repository.save([
          this.repository.create({
            question: 'Paket 2 Pertanyaan 1',
            options: 'Opsi A, Opsi B, Opsi C, Opsi D',
            answer: 'Opsi A',
            onTrue: 100,
            onEmpty: 0,
            onFalse: 0,
            img: null,
            type: 'multiple',
            exam_Package: examPackageTwo,
          }),
          this.repository.create({
            question: 'Paket 2 Pertanyaan 2',
            options: null,
            answer: 'Opsi A',
            onTrue: 100,
            onEmpty: 0,
            onFalse: 0,
            img: null,
            type: 'essay',
            exam_Package: examPackageTwo,
          }),
        ]);
      }
    }
  }
}
