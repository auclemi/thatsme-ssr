import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Instance Express sous-jacente
  const expressApp = app.getHttpAdapter().getInstance();

  // 1) Servir les assets Angular
  const browserDist = join(process.cwd(), '../client/dist/browser');
  expressApp.use(express.static(browserDist));

  // 2) Charger le moteur SSR Angular
  const angularServer = join(process.cwd(), '../client/dist/server/main.server.mjs');
  const { default: angularRender } = await import(angularServer);

  // 3) Fallback SSR pour toutes les routes non-API
  expressApp.get('*', async (req: Request, res: Response) => {
    const html = await angularRender({
      url: req.url,
      document: '<!DOCTYPE html><html><head></head><body><app-root></app-root></body></html>',
    });

    res.send(html);
  });

  await app.listen(3000);
  console.log('SSR Nest + Angular running on http://localhost:3000');
}

bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';

// async function bootstrap() {
//   const server = express();

//   // IMPORTANT : ExpressAdapter ici
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

//   // Fichiers Angular (CSR)
//   app.useStaticAssets(join(__dirname, '..', 'dist-angular/browser'));

//   // Angular SSR engine
//   const { ɵserverAppEngine } = await import('../dist-angular/server/server.mjs');

//   app.engine('html', ɵserverAppEngine());
//   app.setViewEngine('html');

//   // SSR fallback
//   server.get('*', (req, res) => {
//     res.render('index', { req });
//   });

//   await app.listen(3000);
//   console.log('SSR Nest + Angular running on http://localhost:3000');
// }

// bootstrap();
