import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";

@Entity()
export class Event {

    @PrimaryGeneratedColumn({name:'event_id'})
    id:number

    @Column()
    name:string

    @Column({type: 'time'})
    start_time: Date

    @Column({type: 'time'})
    end_time: Date

    @Column({default:250})
    available_seats:number

    @OneToMany(() => Booking, (booking) => booking.event, {cascade:true,
        onDelete: 'CASCADE'
    })
    bookings:Booking[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date


}
