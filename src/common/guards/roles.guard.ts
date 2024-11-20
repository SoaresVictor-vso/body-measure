import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles || roles.includes('default'))        // se não tem role ou role default é permitida, libera para todos
            return true;
        
        const request = context.switchToHttp().getRequest();
        const id = request.user?.id;
        if(!id)
            return false;

        try {
            const user = await this.userService.findOneOrFail({ where: { id } })
            return this.matchRoles(roles, user.role);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    matchRoles(allowed: Array<string>, userRole: string): boolean {
        return allowed.includes(userRole);
    }
}