import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MeasureEntity } from "../measure/measure.entity";

@Entity(`METRIC`)
export class MetricEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    unit: string;

    @OneToMany(() => MeasureEntity, (measure) => measure.metric)
    measures: MeasureEntity[];
}