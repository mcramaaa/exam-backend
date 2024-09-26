import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/database/entities/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamSeedService {
  constructor(
    @InjectRepository(Exam)
    private repository: Repository<Exam>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Ujian SMA',
          isActive: false,
          isOneTime: false,
          isPackage: false,
          degree: 'SMA/SMK',
          time: '120 menit',
          start: '2024-01-01 08:00:00',
          end: '2025-01-01 18:00:00',
        }),
      );
    }
  }
}
