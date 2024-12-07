/* import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetricEntity } from "../metric/metric.entity";

@Entity(`MEASURE`)
export class MeasureEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    

    @ManyToOne(() => MetricEntity, metric => metric.id)
    metric: MetricEntity
} */