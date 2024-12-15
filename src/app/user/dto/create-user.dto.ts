import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/messages.helpers";
import { RegExHelper } from "src/helpers/regex.helpers";

export class CreateUserDto {
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('name')})
    @Matches(RegExHelper.name, {message: MessageHelper.ALPHABETIC_FIELD('name')})
    name: string;
    
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('username')})
    @Matches(RegExHelper.username, {message: MessageHelper.MATCHES('username', 'lowercase|numberany|(.|_)')})
    username: string;
    
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('email')})
    @IsEmail({}, {message: MessageHelper.EMAIL_FIELD('email')})
    email: string;
    
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('password')})
    @Matches(RegExHelper.password, {message: MessageHelper.MATCHES('password', 'uppercase&lowercase&numberany&(#,?,!,@,$,%,^,_et,*,_hyph|_wspc)')})
    password: string;
}