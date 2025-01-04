import { BadRequestException } from "@nestjs/common";
import { MessageHelper } from "../../helpers/messages.helpers";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { MeasureEntity } from "../measure/measure.entity";

@Entity(`SESSIONS`)
export class SessionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ name: 'date' })
    date: string;


    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToMany((_type) => MeasureEntity, (measure) => measure.session)
    measures: MeasureEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    setDate() {
        const dt = new Date(this.date);
        console.log(dt, this.date)
        if (!dt.getTime())
            throw new BadRequestException(MessageHelper.DATE_FIELD(`data`));

        this.date = dt.toISOString();
        // this.dateString = dt.toISOString();
    }
}