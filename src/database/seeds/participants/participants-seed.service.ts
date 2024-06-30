import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/database/entities/participants.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantSeedService {
  constructor(
    @InjectRepository(Participants)
    private repository: Repository<Participants>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          id: '101010',
          name: 'Bejo',
          birth: '10-07-2000',
          email: 'bejo@exam.com',
          password: 'qweqweqwe',
        }),
      );
    }
  }
}
