import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './shared/types/config.type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { VersioningType } from '@nestjs/common';
import { BackofficeModules } from './app-backoffice/module';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  const port = configService.getOrThrow('app.port', { infer: true });

  app.useStaticAssets(join(__dirname, '..', 'storage', 'imgs'), {
    prefix: '/images/',
  });

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (process.env.NODE_ENV !== 'development') {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        realm: 'Swagger',
        users: {
          admin: String(process.env.SWAGGER_SECRET),
        },
      }),
    );
  }
  // Backoffice Swagger
  SwaggerModule.setup(
    'docs/backoffice',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API Backoffce')
        .setDescription('API Backoffce docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
      {
        include: BackofficeModules,
      },
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  // // User Swagger
  // SwaggerModule.setup(
  //   'docs/user',
  //   app,
  //   SwaggerModule.createDocument(
  //     app,
  //     new DocumentBuilder()
  //       .setTitle('API User')
  //       .setDescription('API User docs')
  //       .setVersion('1.0')
  //       .addBearerAuth()
  //       .build(),
  //     {
  //       include: UserCLientModules,
  //     },
  //   ),
  //   {
  //     swaggerOptions: {
  //       persistAuthorization: true,
  //     },
  //   },
  // );

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('API Backoffice')
  //   .setDescription('API Backoffice docs')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, swaggerConfig, {
  //   include: BackofficeModules,
  // });

  // SwaggerModule.setup('docs/backoffice', app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  // });

  await app.listen(port);
}

bootstrap();
