import { BadRequestException } from "@nestjs/common";
import { MessageHelper } from "../../helpers/messages.helpers";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity(`SESSIONS`)
export class SessionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'user_id'})
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({name:'user_id'})
    user: UserEntity;

    @Column('date')
    date: Date | string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @BeforeInsert()
    @BeforeUpdate() 
    setDate()  {
        const dt = new Date(this.date);
        console.log(dt, this.date)
        if(!dt.getTime())
            throw new BadRequestException(MessageHelper.DATE_FIELD(`data`));

        this.date = dt;
    }
}