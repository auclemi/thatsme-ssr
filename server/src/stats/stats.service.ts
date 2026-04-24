import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);
  private readonly filePath: string;

  constructor(private configService: ConfigService) {
    // Prioritize system environment variable for reliability
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';
    this.filePath = join(process.cwd(), isDev ? 'stats.dev.json' : 'stats.json');
    this.logger.log(`Stats persistence initialized at: ${this.filePath}`);
  }

  private async load(): Promise<any[]> {
    try {
      const rawData = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error: any) {
      if (error.code === 'ENOENT') return []; // File not found is normal for first start
      this.logger.error(`Error loading stats: ${error.message}`);
      return [];
    }
  }

  private async saveAll(data: any[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error: any) {
      this.logger.error(`Error saving stats: ${error.message}`);
    }
  }

  async add(entry: any): Promise<void> {
    const data = await this.load();
    // Ensure a timestamp exists
    data.push({ ...entry, ts: entry.ts || Date.now() });
    await this.saveAll(data);
  }

  async getAll(): Promise<any[]> {
    return this.load();
  }
}
