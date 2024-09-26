import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateExamPackageDto } from './dto/create-exam-package.dto';
import { UpdateExamPackageDto } from './dto/update-exam-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ExamService } from '../exam/exam.service';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { TExamPackage } from 'src/shared/types/dataType/exam-package-filter.types';

@Injectable()
export class ExamPackageService {
  constructor(
    @InjectRepository(ExamPackage)
    private examPackageRepo: Repository<ExamPackage>,
    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TExamPackage,
  ): Promise<[ExamPackage[], number]> {
    const exam = await this.examPackageRepo.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        id: filter.id ? filter.id : undefined,
        name: filter.name ? Like(`%${filter.name}%`) : undefined,
      },
      relations: {
        exam: true,
      },
    });
    if (!exam) {
      throw new NotFoundException('Cant find participants');
    }
    return exam;
  }

  async findOne(id: number) {
    const data = await this.examPackageRepo.findOne({
      relations: { exam: true },
      where: { id: id },
    });
    return data;
  }

  async create(payload: CreateExamPackageDto): Promise<ExamPackage> {
    const exam = await this.examService.findOne(payload.exam_id);

    if (!exam) {
      throw new NotFoundException('Cant find a exam');
    }

    return await this.examPackageRepo.save(
      this.examPackageRepo.create({ ...payload, exam }),
    );
    // return exam;
  }

  async update(
    id: number,
    payload: UpdateExamPackageDto,
  ): Promise<ExamPackage> {
    const examPackage = await this.findOne(id);

    if (!examPackage) {
      throw new NotFoundException('Cant find a examPackage');
    }
    examPackage.name = payload.name;

    if (payload.exam_id) {
      const exam = await this.examService.findOne(payload.exam_id);
      if (!exam) {
        throw new NotFoundException('Cant find a exam');
      }
      examPackage.exam = exam;
    }

    return this.examPackageRepo.save(examPackage);
  }

  remove(id: number) {
    return `This action removes a #${id} examPackage`;
  }
}
