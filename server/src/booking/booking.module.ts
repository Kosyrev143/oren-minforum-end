import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingController } from './booking.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from './entities/booking.entity'
import { QrcodeModule } from '../qrcode/qrcode.module'
import { QrcodeService } from '../qrcode/qrcode.service'
import { EmailsModule } from '../mailer/mailer.module'
import { UserModule } from '../user/user.module'
import { EventModule } from '../event/event.module'
import {User} from "../user/entities/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Booking]),
		TypeOrmModule.forFeature([User]),
		EventModule,
	],
	controllers: [BookingController],
	providers: [BookingService],
	exports: [BookingService],
})
export class BookingModule {}
