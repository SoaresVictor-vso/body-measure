import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { UserEntity } from 'src/app/user/user.entity';
import { compareSync} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async ValidateUser(identifier: string, password: string) {
        let user: UserEntity;
        try {
            user = await this.userService.findOneOrFail({
                where: [
                    { email: identifier },
                    { username: identifier }
                ]
            })

        } catch (error) {
            return null;
        }

        
        const isPasswordValid = compareSync(password, user.password);
        if(!isPasswordValid)
            return null;

        return user;
    }

    login(user: UserEntity) {
        const payload = {
            id: user.id,
            username: user.username
        }

        return this.jwtService.sign(payload)
    }
}
