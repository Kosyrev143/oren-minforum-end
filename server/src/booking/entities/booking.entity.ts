import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Event} from "../../event/entities/event.entity";
import * as events from "events";
import {Qrcode} from "../../qrcode/entities/qrcode.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn({name:'booking_id'})
    id:number

    @ManyToOne(() => User, (user) => user.bookings, {cascade:true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name:'user_id'})
    user:User

    @ManyToOne(() => Event, (event) => event.bookings)
    @JoinColumn({name:'event_id'})
    event:Event

    @OneToMany(() => Qrcode, (qrcode) => qrcode.booking)
    qrcods:Qrcode[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date

}
