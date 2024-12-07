import { IsInt, isNotEmpty } from "class-validator";
import { MessageHelper } from "../../../helpers/messages.helpers";

export class CreateMeasureDto {
    @IsInt({ message: MessageHelper.INT_FIELD(`medida`) })
    value: number;

    @IsInt({message: MessageHelper.INT_FIELD(`métrica`)})
    metric_id: number;
}