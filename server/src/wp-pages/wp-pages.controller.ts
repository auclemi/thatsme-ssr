import { Controller, Get } from '@nestjs/common';
import { WpPagesService } from './wp-pages.service';

@Controller('api/wp-pages')
export class WpPagesController {
  constructor(private readonly content: WpPagesService) {}

  @Get()
  getWpPages() {
    console.log('Received request for WP pages');
    return this.content.getWpPages();
  }
}
