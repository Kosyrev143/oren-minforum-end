import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Event} from "../../event/entities/event.entity";
import {Booking} from "../../booking/entities/booking.entity";
import {IsNotEmpty, IsString} from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn({name:'user_id'})
    id:number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    middlename: string

    @Column()
    email: string

    @Column()
    phone:string

    @Column()
    organization: string

    @Column()
    post: string

    @Column()
    district: string

    @Column("int", { array: true })
    events: number[]


    @OneToMany(() => Booking, (booking) => booking.user)
    bookings:Booking[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date

}
