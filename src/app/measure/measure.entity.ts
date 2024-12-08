import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetricEntity } from "../metric/metric.entity";
import { SessionEntity } from "../session/session.entity";

@Entity(`MEASURE`)
export class MeasureEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'session_id'})
    sessionId: number;

    @ManyToOne(() => SessionEntity, (session) => session.id)
    @JoinColumn({name: 'session_id'})
    session: SessionEntity;

    @Column({name: 'metric_id'})
    metricId: number;

    @ManyToOne(() => MetricEntity, (metric) => metric.id)
    @JoinColumn({name: 'metric_id'})
    metric: MetricEntity;

    @Column('integer')
    value: number;
}