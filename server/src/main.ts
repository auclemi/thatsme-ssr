import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4000', 'https:localhost:443', 'https://thatsme.freeboxos.fr', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
  console.log('Nest API running on http://localhost:3000 et 0.0.0.0');
}

bootstrap();
