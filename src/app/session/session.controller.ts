import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionService } from './session.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/v1/session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Get(':id')
    async getById(
        @Param('id') idString: string,
        @Req() req: any
    ) {
        const id = parseInt(idString);
        return {
            error: false,
            data: await this.sessionService.get(id, req.user.id),
            statusCode: 200
        };
    }

    @Roles(['adm'])
    @Get('user/:userId')
    async getByUser(
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Query() query: any
    ) {
        const { init, end, page } = query;
        return {
            error: false,
            data: await this.sessionService.getByUser(userId, init, end, parseInt(page) || 0),
            statusCode: 200
        };
    }

    @Roles(['adm'])
    @Get('user/:userId/:id')
    async getByUserAndId(
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Param('id') idString?: string,
    ) {
        const id = parseInt(idString);
        return {
            error: false,
            data: await this.sessionService.get(id, userId),
            statusCode: 200
        };
    }

    @Get()
    async getMine(
        @Req() req: any,
        @Query() query: any
    ) {
        const { init, end, page } = query;
        return {
            error: false,
            data: await this.sessionService.getByUser(req.user.id, init, end, parseInt(page) || 0),
            statusCode: 200
        };
    }

    @Post()
    async create(@Body() body: CreateSessionDto, @Req() req: any) {
        return this.sessionService.create(body, req.user);
    }
}
