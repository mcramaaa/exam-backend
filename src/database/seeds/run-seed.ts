import { NestFactory } from '@nestjs/core';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';
// import { ParticipantSeedService } from './participants/participants-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  // await app.get(ParticipantSeedService).run();

  await app.close();
};

void runSeed();
