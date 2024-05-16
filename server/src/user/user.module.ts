import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { EventModule } from '../event/event.module'
import { BookingModule } from '../booking/booking.module'
import { QrcodeModule } from '../qrcode/qrcode.module'
import { Booking } from '../booking/entities/booking.entity'
import { Event } from '../event/entities/event.entity'
import {EmailsModule} from "../mailer/mailer.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		TypeOrmModule.forFeature([Event]),
		TypeOrmModule.forFeature([Booking]),
		QrcodeModule,
		EmailsModule,
		EventModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}

