import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WpPagesModule } from './wp-pages/wp-pages.module';

@Module({
  imports: [
    WpPagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
