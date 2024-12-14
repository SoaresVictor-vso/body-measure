import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, Matches, ValidateNested } from "class-validator"
import { CreateMeasureDto } from "src/app/measure/dto/create-measure.dto"
import { MessageHelper } from "src/helpers/messages.helpers";
import { RegExHelper } from "src/helpers/regex.helpers";

export class CreateSessionDto {
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('date')})
    @Matches(RegExHelper.ISO_date, {message: MessageHelper.DATE_FIELD('date')})
    date: Date;

    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD('measures')})
    @IsArray({message: MessageHelper.ARRAY_FIELD('measures')})
    @ValidateNested({each: true})
    @Type(() => CreateMeasureDto)
    measures: CreateMeasureDto[];


}