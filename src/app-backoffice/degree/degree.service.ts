import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree } from 'src/database/entities/degree.entity';

@Injectable()
export class DegreeService {
  constructor(
    @InjectRepository(Degree) private repository: Repository<Degree>,
  ) {}

  async create(createDegreeDto: CreateDegreeDto): Promise<void> {
    console.log(createDegreeDto);
    try {
      await this.repository.save(this.repository.create(createDegreeDto));
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Degree[]> {
    return await this.repository.find();
  }

  async findOne(
    condition: EntityCondition<Degree>,
  ): Promise<NullableType<Degree>> {
    return await this.repository.findOne({ where: condition });
  }

  async update(id: number, payload: UpdateDegreeDto): Promise<void> {
    const degree = await this.findOne({ id: id });
    if (!degree) throw new BadRequestException();
    try {
      Object.assign(degree, payload);
      await degree.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
