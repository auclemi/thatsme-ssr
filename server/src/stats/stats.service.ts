import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class StatsService {
  private file = join(__dirname, '..', 'stats.json');

  private load() {
    if (!fs.existsSync(this.file)) return [];
    return JSON.parse(fs.readFileSync(this.file, 'utf8'));
  }

  private saveAll(data: any[]) {
    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
  }

  add(entry: any) {
    const data = this.load();
    data.push(entry);
    this.saveAll(data);
  }

  getAll() {
    return this.load();
  }
}
