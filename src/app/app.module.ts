import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/shared/config/app.config';
import { AllConfigType } from 'src/shared/types/config.type';
import { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/databases/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        isGlobal: true,
        store: require('cache-manager-redis-store'),
        host: configService.get('cache.host', { infer: true }),
        max: configService.get('cache.max', { infer: true }),
        ttl: configService.get('cache.ttl', { infer: true }),
        port: configService.get('cache.port', { infer: true }),
        // auth_pass: configService.get('cache.auth_pass', { infer: true }),
        db: configService.get('cache.db', { infer: true }),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
