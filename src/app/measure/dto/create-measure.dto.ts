import { IsInt, IsNotEmpty } from "class-validator";
import { MessageHelper } from "../../../helpers/messages.helpers";

export class CreateMeasureDto {
    @IsInt({ message: MessageHelper.INT_FIELD(`valor`) })
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD(`valor`)})
    value: number;

    @IsInt({message: MessageHelper.INT_FIELD(`métrica`)})
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD(`métrica`)})
    metricId: number;
}