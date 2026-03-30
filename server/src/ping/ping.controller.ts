/**
 * This controller provides a simple endpoint for checking if the server is responsive. It can be used by the client to determine if the server is online or offline, 
 * which is especially useful for the offline banner functionality in the client application.
 * Don't remove me, I'm important!
 */
import { Controller, Get } from '@nestjs/common';

@Controller('api/ping')
export class PingController {
  @Get()
  getPing() {
    console.log('Received ping');
    return 'pong';
  }
}
