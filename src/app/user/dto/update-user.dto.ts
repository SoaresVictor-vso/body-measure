
import { IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from "src/helpers/regex.helpers";

export class UpdateUserDto {
    @IsNotEmpty()
    @Matches(RegExHelper.name, {message: `O nome deve conter de 3 a 50 caracteres de A a Z e espaços.`})
    name: string;
}