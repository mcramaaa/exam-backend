import { NestFactory } from '@nestjs/core';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';
import { ParticipantSeedService } from './participants/participants-seed.service';
import { ExamSeedService } from './exam/exam-seed.service';
import { ExamPackageSeedService } from './exam-package/exam-pack-seed.service';
import { QuestionSeedService } from './questions/questions-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  await app.get(ParticipantSeedService).run();
  await app.get(ExamSeedService).run();
  await app.get(ExamPackageSeedService).run();
  await app.get(QuestionSeedService).run();

  await app.close();
};

void runSeed();
