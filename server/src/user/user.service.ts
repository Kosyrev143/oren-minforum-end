import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QrcodeService } from '../qrcode/qrcode.service';
import { EventService } from '../event/event.service';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/entities/booking.entity';
import { Event } from '../event/entities/event.entity';
import * as ExcelJS from 'exceljs';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly eventService: EventService,
		private readonly bookingService: BookingService,
		@InjectRepository(Booking)
		private readonly bookingRepository: Repository<Booking>,
		@InjectRepository(Event)
		private readonly eventRepository: Repository<Event>,
		private readonly qrcodeService: QrcodeService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const { events, ...userData } = createUserDto;
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		});
		if (existUser) {
			throw new BadRequestException('This email already exists!');
		}

		const user = await this.userRepository.save({
			...userData,
			events: createUserDto.events,
		});

		await Promise.all(
			events.map(async (eventId) => {
				const event = await this.eventService.findOne(eventId);
				if (!event) {
					throw new BadRequestException('The event does not exist');
				}
				if (event.available_seats <= 0) {
					throw new BadRequestException(`No available seats for event "${event.name}"`);
				}

				await this.bookingService.create({
					user,
					event,
				});

				event.available_seats--;
				await this.eventRepository.save(event);
			}),
		);

		return { user };
	}

	async remove(id: number){
		// Поиск пользователя по ID
		const user = await this.userRepository.findOne({ where: { id: id } });

		// Проверка на существование пользователя
		if (!user) {
			throw new BadRequestException(`Пользователь с ID ${id} не найден`);
		}

		const events = await Promise.all(user.events.map(async (eventId) => {
			const event = await this.eventRepository.findOne({ where: { id: eventId } });
			if (event) {
				// Увеличение доступных мест для события
				event.available_seats++;
				await this.eventRepository.save(event);
			}
		}));
		// Удаление пользователя
		console.log("233333333333333333")
		await this.userRepository.remove(user);

		return `Пользователь с ID ${id} успешно удален`;
	}


	async findAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async exportUsersToExcel() {
		const users = await this.userRepository.find();

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Users');

		worksheet.addRow(['Id', 'Имя', 'Фамилия', 'Отчество', 'Почта', 'Телефон', 'Организация', 'Должность', 'Местоположение', 'События']);

		// Пройдемся по каждому пользователю
		for (const user of users) {
			const eventsData = [];
			// Пройдемся по каждому идентификатору события пользователя
			for (const eventId of user.events) {
				// Найти событие по его идентификатору
				const event = await this.eventService.findOne(eventId);
				if (event) {
					// Если событие найдено, добавляем его в массив событий пользователя
					eventsData.push(event.name);
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
			]);
		}

		// Записываем в буфер и возвращаем
		return await workbook.xlsx.writeBuffer();
	}
}