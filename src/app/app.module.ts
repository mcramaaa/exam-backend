import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import appConfig from 'src/shared/config/app.config';
import databaseConfig from 'src/shared/config/database.config';
import { BackofficeModules } from 'src/app-backoffice/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from 'src/shared/config/auth.config';
import cacheConfig from 'src/shared/config/cache.config';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { AuthModule } from 'src/auth/auth.module';
import { AllConfigType } from 'src/shared/types/config.type';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, cacheConfig],
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService<AllConfigType>) => ({
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
    AuthModule,
    AppCacheModule,
    ...BackofficeModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
