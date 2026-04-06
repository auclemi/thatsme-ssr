import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WpPagesModule } from './wp-pages/wp-pages.module';
import { PingModule } from './ping/ping.module';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    WpPagesModule, PingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}