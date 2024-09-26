import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/shared/config/app.config';
import databaseConfig from 'src/shared/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';

import { AdminSeedModule } from './admin/admin-seed.module';
import { ParticipantSeedModule } from './participants/participants-seed.module';
import { ExamSeedModule } from './exam/exam-seed.module';
import { ExamPackageSeedModule } from './exam-package/exam-pack-seed.module';
import { QuestionSeedModule } from './questions/questions-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AdminSeedModule,
    ParticipantSeedModule,
    ExamSeedModule,
    ExamPackageSeedModule,
    QuestionSeedModule,
  ],
})
export class SeedModule {}
