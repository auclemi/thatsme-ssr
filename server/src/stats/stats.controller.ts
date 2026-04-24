import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
    constructor(private stats: StatsService) { }


    @Post('api/stats')
    async log(@Body() data: any) {
        // console.log('📩 BODY REÇU =', data);
        const blacklist = ['/stats'];
        if (!blacklist.includes(data.path)) {
            await this.stats.add(data);
        }
        return { ok: true };
    }

    @Get('stats-view') // Rename this so it doesn't conflict with /api/stats
    async view(@Res() res: Response) {
        const data = await this.stats.getAll();

        const html = `
      <h1>Stats simples</h1>
      <p>Visites totales : ${data.length}</p>
      <p>Visiteurs uniques : ${new Set(data.map(d => d.uid)).size}</p>

      <h2>Détails</h2>
      <ul>
        ${data
                .map(
                    d =>
                        `<li>${new Date(d.ts).toLocaleString()} — ${d.path} — ${d.uid}</li>`
                )
                .join('')}
      </ul>
    `;

        res.send(html);
    }

    @Get('api/stats')
    async getStats() {
        const data = await this.stats.getAll();
        return data;
    }
}
