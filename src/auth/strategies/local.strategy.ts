import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MessageHelper } from "src/helpers/messages.helpers";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'identifier',
            passwordField: 'password'
        });
    }

    async validate(identifier: string, password: string) {
        const user = await this.authService.ValidateUser(identifier, password)

        if(!user) throw new UnauthorizedException(MessageHelper.BAD_CREDENTIALS);

        return user;
    }
}