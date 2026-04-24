import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class WpPagesService implements OnModuleInit {
  private readonly logger = new Logger(WpPagesService.name);
  private wpPages: any[] = [];

  async onModuleInit() {
    await this.loadData();
  }

  private async loadData() {
    try {
      const filePath = join(process.cwd(), 'data', 'wp-allpages.json');
      const content = await fs.readFile(filePath, 'utf8');
      this.wpPages = JSON.parse(content);
      this.logger.log(`Successfully loaded ${this.wpPages.length} pages from JSON`);
    } catch (error: any) {
      this.logger.error(`Failed to load wp-allpages.json: ${error.message}`);
      // Fallback to empty array to allow the app to start, 
      // or keep the exception if the file is critical.
      this.wpPages = [];
    }
  }

  getWpPages() {
    if (this.wpPages.length === 0) {
      this.logger.warn('Request for WP pages received but cache is empty.');
    }
    return this.wpPages;
  }
}
