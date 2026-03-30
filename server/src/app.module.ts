import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WpPagesModule } from './wp-pages/wp-pages.module';
import { PingModule } from './ping/ping.module';
@Module({
  imports: [
    WpPagesModule, PingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
