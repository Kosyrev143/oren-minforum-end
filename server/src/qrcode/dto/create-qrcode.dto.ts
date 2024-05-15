import {IsNotEmpty, IsString} from "class-validator";
import {Column, JoinColumn, ManyToOne} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";

export class CreateQrcodeDto  {

    // booking id
    @IsNotEmpty()
    @IsString()
    booking:Booking

    @IsNotEmpty()
    @IsString()
    url: string

}
