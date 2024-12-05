import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}