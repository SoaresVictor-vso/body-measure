import { IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/messages.helpers";
import { RegExHelper } from "src/helpers/regex.helpers"

export class MetricDto {
    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('name') })
    @Matches(RegExHelper.alphanumericSpace, {message: MessageHelper.ALPHANUMERIC_FIELD('name')})
    name: string;

    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('description') })
    @Matches(RegExHelper.alphanumericSpace, {message: MessageHelper.ALPHANUMERIC_FIELD('description')})
    description: string;

    @IsNotEmpty({ message: MessageHelper.EMPTY_FIELD('unit') })
    @Matches(/^(g|mm)$/, {message: MessageHelper.MATCHES('unit', '(mm|g)')})
    unit: string;
}