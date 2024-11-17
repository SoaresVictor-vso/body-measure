import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from "src/helpers/regex.helpers";

export class CreateUserDto {
    @IsNotEmpty({message: "O email deve ser informado."})
    @IsEmail({}, {message: "O email informado não é válido."})
    email: string;
    
    @IsNotEmpty()
    @Matches(RegExHelper.name, {message: `O nome deve conter de 3 a 50 caracteres de A a Z e espaços.`})
    name: string;
    
    @IsNotEmpty({message: `O campo senha não pode ser vazio.`})
    @Matches(RegExHelper.password, {message: `A senha deve conter ao menos 8 caracteres, 1 letra maiúscula, 1 minúscula, um número e um caracter especial (#?!@$ %^&*-).`})
    password: string;
    
    @IsNotEmpty({message: `O campo nome de usuário não pode ser vazio.`})
    @Matches(RegExHelper.username, {message: `O nome de usuário deve ser formado por letras minúsculas, numeros, "_" e "."`})
    username: string;
}