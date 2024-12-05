import { IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/messages.helpers";
import { RegExHelper } from "src/helpers/regex.helpers"

export class MetricDto {
    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('nome') })
    @Matches(RegExHelper.alphanumericSpace, {message: MessageHelper.ALPHANUMERIC_FIELD('nome')})
    name: string;

    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('descrição') })
    @Matches(RegExHelper.alphanumericSpace, {message: MessageHelper.ALPHANUMERIC_FIELD('descrição')})
    description: string;

    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('unidade') })
    @Matches(/^(g|mm)$/, {message: "O campo \"unidade\" deve ser igual a \"g\" ou \"mm\""})
    unit: string;
}