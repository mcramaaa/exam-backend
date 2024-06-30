import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/database/entities/exam.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { DegreeService } from '../degree/degree.service';
import { ExamPackageService } from '../exam-package/exam-package.service';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private degreeService: DegreeService,
    @Inject(forwardRef(() => ExamPackageService))
    private readonly examPackageService: ExamPackageService,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Exam[], number]> {
    const exam = await this.examRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    if (!exam) {
      throw new NotFoundException('Cant find participants');
    }
    return exam;
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id: id },
    });
    return exam;
  }

  async create(data: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.save(
      this.examRepository.create({ ...data }),
    );

    if (!data.isPackage) {
      await this.examPackageService.create({
        name: 'Paket Soal',
        exam_id: (await exam).id,
      });
    }

    return await exam;
  }

  async update(id: number, data: UpdateExamDto) {
    const exam = await this.findOne(id);
    if (!exam) {
      throw new NotFoundException('Cant find a exam');
    }
    Object.assign(exam, data);
    return exam.save();
  }

  async remove(id: number): Promise<void> {
    await this.examRepository.delete(id);
  }
}

// import {
//   Inject,
//   Injectable,
//   NotFoundException,
//   forwardRef,
// } from '@nestjs/common';
// import { CreateExamDto } from './dto/create-exam.dto';
// import { UpdateExamDto } from './dto/update-exam.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Exam } from 'src/database/entities/exam.entity';
// import { Repository } from 'typeorm';
// import { IPaginationOptions } from 'src/shared/types/pagination-options';
// import { ExamPackageService } from '../exam-package/exam-package.service';

// @Injectable()
// export class ExamService {
//   constructor(
//     @InjectRepository(Exam)
//     private examRepository: Repository<Exam>,
//     @Inject(forwardRef(() => ExamPackageService))
//     private readonly examPackageService: ExamPackageService,
//   ) {}

//   async findManyWithPagination(
//     paginationOptions: IPaginationOptions,
//   ): Promise<[Exam[], number]> {
//     const exam = await this.examRepository.findAndCount({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,
//     });
//     if (!exam) {
//       throw new NotFoundException('Cant find participants');
//     }
//     return exam;
//   }

//   async findOne(id: number): Promise<Exam> {
//     const exam = await this.examRepository.findOne({
//       where: { id: id },
//     });
//     return exam;
//   }

//   async create(data: CreateExamDto): Promise<Exam> {
//     const newExam = this.examRepository.create(data);
//     const exam = await this.examRepository.save(newExam);

//     if (!data.isPackage) {
//       await this.examPackageService.create({
//         name: 'Paket Soal',
//         exam_id: exam.id,
//       });
//     }

//     return exam;
//   }

//   async update(id: number, data: UpdateExamDto) {
//     const exam = await this.findOne(id);
//     if (!exam) {
//       throw new NotFoundException('Cant find an exam');
//     }
//     Object.assign(exam, data);
//     return this.examRepository.save(exam);
//   }

//   async remove(id: number): Promise<void> {
//     await this.examRepository.delete(id);
//   }
// }
