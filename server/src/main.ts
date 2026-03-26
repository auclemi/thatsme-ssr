// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import * as express from 'express';
// import { Request, Response } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
// console.log('API routes are handled by NestJS');

//   // CORS
//   app.enableCors({
//     origin: ['http://localhost:4200', 'http://localhost:3000'],
//     credentials: true,
//   });

//   const expressApp = app.getHttpAdapter().getInstance();

//   // Assets Angular
//   const browserDist = join(__dirname, '../../client/dist/browser');
//   expressApp.use(express.static(browserDist));

//   // SSR Angular
//   const angularServer = join(__dirname, '../../client/dist/server/main.server.mjs');
//   const { default: angularRender } = await import(angularServer);

//   // Laisser Nest gérer /api
//   expressApp.use('/api', (req, res, next) => next());
//   // SSR fallback
//   expressApp.get('*', async (req: Request, res: Response, next) => {
//     if (req.url.startsWith('/api')) {
//       return next(); // ne pas SSR les routes API
//     }

//     try {
//       const html = await angularRender({
//         url: req.url,
//         document: '<!DOCTYPE html><html><head></head><body><app-root></app-root></body></html>',
//       });

//       res.send(html);
//     } catch (err) {
//       console.error('SSR error:', err);
//       res.status(500).send('SSR Error');
//     }
//   });

//   await app.listen(3000);
//   console.log('SSR Nest + Angular running on http://localhost:3000');
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4000'],
    credentials: true,
  });

  await app.listen(3000);
  console.log('Nest API running on http://localhost:3000');
}

bootstrap();
