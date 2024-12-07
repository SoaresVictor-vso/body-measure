import { IsArray, IsDate, IsNotEmpty, Matches } from "class-validator"
import { CreateMeasureDto } from "src/app/measure/dto/create-measure.dto"
import { MessageHelper } from "src/helpers/messages.helpers";
import { RegExHelper } from "src/helpers/regex.helpers";

export class CreateSessionDto {
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('data')})
    @Matches(RegExHelper.ISO_date, {message: MessageHelper.DATE_FIELD('data')})
    date: Date;

    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('medições')})
    @IsArray({message: MessageHelper.ARRAY_FIELD('medições')})
    measures: CreateMeasureDto[];


}