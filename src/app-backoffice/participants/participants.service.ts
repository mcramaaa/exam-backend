import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TParticipantFilter } from 'src/shared/types/dataType/participants-filter.types';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { ErrorException } from 'src/shared/exception/error.exception';
import { Participants } from 'src/database/entities/participants.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participants)
    private participantsRepository: Repository<Participants>,
  ) {}

  async create(data: CreateParticipantDto[]): Promise<Participants[]> {
    const participants = data.map((participantData) => {
      return this.participantsRepository.create(participantData);
    });

    return await this.participantsRepository.save(participants);
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TParticipantFilter,
  ): Promise<[Participants[], number]> {
    const participant = await this.participantsRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        id: filter.id ? filter.id : undefined,
        name: filter.name ? Like(`%${filter.name}%`) : undefined,
        email: filter.email ? Like(`%${filter.email}%`) : undefined,
        birth: filter.birth ? Like(`%${filter.birth}%`) : undefined,
      },
    });
    if (participant[0].length === 0) {
      throw new NotFoundException('Cant find participants');
    }
    return participant;
  }

  async findOne(condition: EntityCondition<Participants>) {
    return await this.participantsRepository.findOne({
      where: condition,
    });
  }

  async update(id: string, payload: UpdateParticipantDto) {
    const participant = await this.findOne({
      id: id,
    });

    if (!participant) {
      throw new NotFoundException('Cant find participant');
    }

    if (payload.email) {
      if (!payload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ErrorException(
          {
            email: 'email format is not valid',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      participant.email = payload.email;
    }

    if (payload.id) {
      participant.id = payload.id;
    }
    if (payload.name) {
      participant.name = payload.name;
    }
    if (payload.birth) {
      participant.birth = payload.birth;
    }
    if (payload.password) {
      participant.password = payload.password;
    }

    return participant.save();
  }

  async remove(id: number) {
    try {
      await this.participantsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
