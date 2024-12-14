import { IsInt, IsNotEmpty } from "class-validator";
import { MessageHelper } from "../../../helpers/messages.helpers";

export class CreateMeasureDto {
    @IsInt({ message: MessageHelper.INT_FIELD(`value`) })
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD(`value`)})
    value: number;

    @IsInt({message: MessageHelper.INT_FIELD(`metricId`)})
    @IsNotEmpty({message: MessageHelper.EMPTY_FIELD(`metricId`)})
    metricId: number;
}