import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MetricService } from './metric.service';
import { MetricDto } from './dto/metric.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(['adm'])
@Controller('api/v1/metric')
export class MetricController {
    constructor(private readonly metricService: MetricService) { }

    @Get()
    async getAll(@Req() req: any) {
        console.log(req.user)
        return await this.metricService.findAll();
    }



    @Post()
    async create(@Body() body: MetricDto){
        return await this.metricService.create(body);
    }
}
