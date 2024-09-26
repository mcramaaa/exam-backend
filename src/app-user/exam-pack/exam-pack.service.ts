import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantsService } from 'src/app-backoffice/participants/participants.service';
import { ExamPackage } from 'src/database/entities/exam-package.entity';
import { Participants } from 'src/database/entities/participants.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository, In } from 'typeorm';

@Injectable()
export class ExamPackService {
  constructor(
    @InjectRepository(ExamPackage)
    private examPackageRepo: Repository<ExamPackage>,
    private paricipanService: ParticipantsService,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    user: Participants,
  ): Promise<[ExamPackage[], number]> {
    const userData = await this.paricipanService.findOne({ id: user.id });
    const examPackages = userData.exam_package;

    if (!Array.isArray(examPackages) || examPackages.length === 0) {
      throw new NotFoundException('No exam packages found for this user');
    }

    const exam = await this.examPackageRepo.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        id: In(examPackages),
      },
      relations: { exam: true },
    });

    return exam;
  }

  async findOne(condition: EntityCondition<ExamPackage>): Promise<ExamPackage> {
    const examPackage = await this.examPackageRepo.findOne({
      where: condition,
      relations: { exam: true },
    });

    if (!examPackage) {
      throw new NotFoundException('Cant find exam package');
    }

    return examPackage;
  }
}
