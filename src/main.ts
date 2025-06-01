import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Раздача статики из папки public
  app.useStaticAssets(resolve(__dirname, '..', 'vite'));

  await app.listen(3000);
}
bootstrap();