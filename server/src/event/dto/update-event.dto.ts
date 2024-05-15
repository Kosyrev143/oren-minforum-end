import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateEventDto extends PartialType(CreateEventDto) {
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
