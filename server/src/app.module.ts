import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WpPagesModule } from './wp-pages/wp-pages.module';
import { PingModule } from './ping/ping.module';
import { LoggerMiddleware } from './logger.middleware';
import { ContactModule } from './contact/contact.module';
import { AdminModule } from './admin/admin.module';
import { StatsModule } from './stats/stats.module';

import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as path from 'path';

@Module({
  imports: [
    // 🔥 Charge le .env en dev ET en prod
    ConfigModule.forRoot({
      isGlobal: true,
       envFilePath: process.env.NODE_ENV === 'production'
        ? join(process.cwd(), '.env.production')
        : join(process.cwd(), '.env'),
    }),

    WpPagesModule,
    PingModule,
    ContactModule,
    AdminModule,
    StatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
