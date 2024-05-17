import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { QrcodeService } from '../qrcode/qrcode.service'
import { EventService } from '../event/event.service'
import { Booking } from '../booking/entities/booking.entity'
import { Event } from '../event/entities/event.entity'
import * as ExcelJS from 'exceljs'
import {EmailService} from "../mailer/mailer.service";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly eventService: EventService,
		@InjectRepository(Booking)
		private readonly bookingRepository: Repository<Booking>,
		@InjectRepository(Event)
		private readonly eventRepository: Repository<Event>,
		private readonly qrcodeService: QrcodeService,
		private readonly emailService: EmailService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const { events, ...userData } = createUserDto
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		})
		if (existUser) {
			throw new BadRequestException('This email already exists!')
		}

		const user = await this.userRepository.save({
			...userData,
			events: createUserDto.events,
		})

		await Promise.all(
			events.map(async (eventId) => {
				const event = await this.eventService.findOne(eventId)
				if (!event) {
					throw new BadRequestException('The event does not exist')
				}
				if (event.available_seats <= 0) {
					throw new BadRequestException(
						`No available seats for event "${event.name}"`,
					)
				}

				await this.bookingRepository.save({
					user,
					event,
				})

				event.available_seats--
				await this.eventRepository.save(event)
			}),
		)
		const booking = await this.bookingRepository.findOne({
			where: { user: user },
		})
		const qrcode = await this.qrcodeService.create({
			booking: booking,
			url: `http://localhost:5000/api/profile/${user.id}`,
		})
		await this.emailService.sendEmail({
			name: user.name,
			surname: user.surname,
			middlename: user.middlename,
			qrcode,
			email: user.email,
			id: user.id,
			events: user.events,
		})
		await this.emailService.sendEmailConfirmation2({
			name: user.name,
			surname: user.surname,
			middlename: user.middlename,
			qrcode,
			email: user.email,
			id: user.id,
			events: user.events,
		})

		await this.emailService.sendEmailConfirmation3({
			name: user.name,
			surname: user.surname,
			middlename: user.middlename,
			qrcode,
			email: user.email,
			id: user.id,
			events: user.events,
			post: user.post,
			organization: user.organization,
		})

		return { user }
	}

	async remove(id: number) {
		// Поиск пользователя по ID
		const user = await this.userRepository.findOne({ where: { id: id } })

		// Проверка на существование пользователя
		if (!user) {
			throw new BadRequestException(`Пользователь с ID ${id} не найден`)
		}

		await Promise.all(
			user.events.map(async (eventId) => {
				const event = await this.eventRepository.findOne({
					where: { id: eventId },
				})
				if (event) {
					// Увеличение доступных мест для события
					event.available_seats++
					await this.eventRepository.save(event)
				}
			}),
		)
		await this.userRepository.remove(user)

		return `Пользователь с ID ${id} успешно удален`
	}

	async findOne(userId: number): Promise<User> {
		return await this.userRepository.findOne({ where: { id: userId } })
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find()
	}

	async exportUsersToExcel() {
		const users = await this.userRepository.find()

		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Users')

		worksheet.addRow([
			'Id',
			'Имя',
			'Фамилия',
			'Отчество',
			'Почта',
			'Телефон',
			'Организация',
			'Должность',
			'Город, Район',
			'События',
		])

		// Пройдемся по каждому пользователю
		for (const user of users) {
			const eventsData = []
			// Пройдемся по каждому идентификатору события пользователя
			for (const eventId of user.events) {
				// Найти событие по его идентификатору
				const event = await this.eventService.findOne(eventId)
				if (event) {
					// Если событие найдено, добавляем его в массив событий пользователя
					eventsData.push(event.name)
				}
			}
			// Добавляем данные пользователя в таблицу Excel
			worksheet.addRow([
				user.id,
				user.name,
				user.surname,
				user.middlename,
				user.email,
				user.phone,
				user.organization,
				user.post,
				user.district,
				eventsData.join(', '), // Преобразуем массив идентификаторов событий в строку
			])
		}

		// Записываем в буфер и возвращаем
		return await workbook.xlsx.writeBuffer()
	}
}
