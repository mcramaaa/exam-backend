import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantSeedService } from './participants-seed.service';
import { Participants } from 'src/database/entities/participants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participants])],
  providers: [ParticipantSeedService],
  exports: [ParticipantSeedService],
})
export class ParticipantSeedModule {}
