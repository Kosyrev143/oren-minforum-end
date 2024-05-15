import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";
import {Event} from "../../event/entities/event.entity";

@Entity()
export class Qrcode {
    @PrimaryGeneratedColumn({name:'qrcode_id'})
    id:number

    @ManyToOne(() => Booking, (booking) => booking.qrcods, {cascade:true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name:'booking_id'})
    booking:Booking

    @Column()
    url: string

}
