import {User} from "../../user/entities/user.entity";
import {JoinColumn, ManyToOne} from "typeorm";
import {Event} from "../../event/entities/event.entity";
import {IsNotEmpty} from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    user:User

    @IsNotEmpty()
    event:Event
}
