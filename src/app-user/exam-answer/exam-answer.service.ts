import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamAnswerDto } from './dto/create-exam-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamAnswers } from 'src/database/entities/exam-answer.entity';
import { Participants } from 'src/database/entities/participants.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/shared/types/pagination-options';

@Injectable()
export class ExamAnswerService {
  constructor(
    @InjectRepository(ExamAnswers)
    private readonly examAnswersRepository: Repository<ExamAnswers>,
    @InjectRepository(Participants)
    private readonly participantsRepository: Repository<Participants>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    user: Participants,
  ): Promise<[ExamAnswers[], number]> {
    const exam = await this.examAnswersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: { participant: { id: user.id } },
      relations: { exam_package: true },
    });
    console.log(exam);

    if (!exam) {
      throw new NotFoundException('Cant find participants');
    }

    return exam;
  }

  async create(payload: CreateExamAnswerDto): Promise<ExamAnswers> {
    const participant = await this.participantsRepository.findOneBy({
      id: payload.participantId,
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id ${payload.participantId} not found`,
      );
    }

    const newExamAnswer = this.examAnswersRepository.create({
      ...payload,
      log: JSON.stringify(payload.log),
      value: 0,
      // participant,
    });

    return this.examAnswersRepository.save(newExamAnswer);
  }

  async findOne(id: number): Promise<ExamAnswers> {
    const examAnswer = await this.examAnswersRepository.findOne({
      where: { id },
      relations: ['participant'],
    });
    if (!examAnswer) {
      throw new NotFoundException(`Exam answer with id ${id} not found`);
    }
    return examAnswer;
  }

  async remove(id: number): Promise<void> {
    await this.examAnswersRepository.delete(id);
  }
}
