import {Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateEventDto {

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    start_time: Date

    @IsNotEmpty()
    end_time: Date

    @IsNumber()
    available_seats:number

}
