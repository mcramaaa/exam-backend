import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/database/entities/question.entity';
import { TQuestionsFilter } from 'src/shared/types/dataType/questions-filter.types';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    //  @InjectRepository(ExamPackage)
    //  private readonly examPackageRepository: Repository<ExamPackage>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TQuestionsFilter,
  ): Promise<[Questions[], number]> {
    const exam = await this.questionsRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        exam_Package: {
          id: filter.examPackage ? filter.examPackage : undefined,
        },
      },
      // relations: { exam_Package: true },
    });
    if (!exam) {
      throw new NotFoundException('Cant find participants');
    }

    return exam;
  }

  async findByPackageId(id: number): Promise<Questions[]> {
    const question = await this.questionsRepository.find({
      where: { exam_Package: { id: id } },
    });
    if (!question) {
      throw new NotFoundException('Cant find a question');
    }

    return question;
  }
}
