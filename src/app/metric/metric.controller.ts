import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/v1/metric')
export class MetricController {
    constructor() { }

    @Roles(['adm'])
    @Get()
    getAll(@Req() req: any) {
        console.log(req.user)
        return { ok: true }
    }
}
