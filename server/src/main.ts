

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4000', 'https://thatsme.local','https://thatsme.local:443'],
    credentials: true,
  });

  await app.listen(3000);
  console.log('Nest API running on http://localhost:3000');
}

bootstrap();
