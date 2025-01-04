import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/ping')
export class PingController {
    @Get()
    ping() {
        console.log(`Ping called`);
        return { ok: true }
    }
}
