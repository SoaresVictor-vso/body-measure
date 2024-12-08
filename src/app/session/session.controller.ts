import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
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
        console.log(req.user)
        const id = parseInt(idString);
        return this.sessionService.get(id, req.user.id);
    }

    @Roles(['adm'])
    @Get('user/:userId')
    async getByUser(
        @Param('userId', new ParseUUIDPipe()) userId: string,
    ) {
        return this.sessionService.getByUser(userId);
    }

    @Roles(['adm'])
    @Get('user/:userId/:id')
    async getByUserAndId(
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Param('id') idString?: string
    ) {
        const id = parseInt(idString);
        return this.sessionService.get(id, userId);
    }

    @Get()
    async getMine(
        @Req() req: any
    ) {
        return this.sessionService.getByUser(req.user.id);
    }

    @Post()
    async create(@Body() body: CreateSessionDto, @Req() req: any) {
        return this.sessionService.create(body, req.user);
    }
}
