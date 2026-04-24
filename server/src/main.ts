import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4000', 'http://localhost:4100', 'https://localhost:443', 'https://thatsme.freeboxos.fr', 'http://localhost:3000', 'http://localhost:3100'],
    credentials: true,
  });

  const port = process.env['PORT'] || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Nest API running on http://localhost:${port} et 0.0.0.0`);
}

bootstrap();
