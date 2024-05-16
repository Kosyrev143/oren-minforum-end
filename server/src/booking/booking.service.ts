import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Booking } from './entities/booking.entity'
import { Event } from '../event/entities/event.entity'
import { QrcodeService } from '../qrcode/qrcode.service'
import { EmailService } from '../mailer/mailer.service'
import { UserService } from '../user/user.service'
import { EventService } from '../event/event.service'
import {User} from "../user/entities/user.entity";

@Injectable()
export class BookingService {
	constructor(
		@InjectRepository(Booking)
		private readonly bookingRepository: Repository<Booking>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createBookingDto: CreateBookingDto) {
		const booking = await this.bookingRepository.save({
			user: createBookingDto.user,
			event: createBookingDto.event,
		})

		return { booking }
	}

	findAll() {
		return `This action returns all booking`
	}

	async findOne(userId: number) {
		const user = await this.userRepository.findOne({
			where: { id: userId },
		})
		return this.bookingRepository.findOne({ where: { user: user } })
	}

	async remove(id: number) {
		const existBooking = await this.bookingRepository.findOne({
			where: {
				id: id,
			},
		})
		if (existBooking) {
			await this.bookingRepository.delete(id)
		} else {
			throw new BadRequestException('Такого письма не существует')
		}
	}
}
