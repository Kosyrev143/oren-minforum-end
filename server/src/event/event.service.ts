import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from './entities/event.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { User } from '../user/entities/user.entity'
import * as ExcelJS from 'exceljs'

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event)
		private readonly eventRepository: Repository<Event>,
	) {}

	async create(createEventDto: CreateEventDto) {
		const event = await this.eventRepository.save({
			name: createEventDto.name,
			start_time: createEventDto.start_time,
			end_time: createEventDto.end_time,
			available_seats: createEventDto.available_seats,
		})
		return { event }
	}

	async findAll(): Promise<Event[]> {
		return await this.eventRepository.find()
	}

	findOne(id: number) {
		return this.eventRepository.findOne({ where: { id: id } })
	}

	async update(updateEventDto: UpdateEventDto) {
		const event = await this.eventRepository.save({
			name: updateEventDto.name,
			start_time: updateEventDto.start_time,
			end_time: updateEventDto.end_time,
			available_seats: updateEventDto.available_seats--,
		})
		return { event }
	}

	async remove(id: number) {
		const existEvent = await this.eventRepository.findOne({
			where: {
				id: id,
			},
		})
		if (existEvent) {
			await this.eventRepository.delete(id)
		} else {
			throw new BadRequestException('Такого мероприятия не существует')
		}
	}

	async exportEventsToExcel() {
		const events = await this.eventRepository.find()

		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Events')

		worksheet.addRow(['Id', 'Название', 'Доступные места'])

		// Пройдемся по каждому событию
		events.forEach((event) => {
			worksheet.addRow([event.id, event.name, event.available_seats])
		})

		// Записываем в буфер и возвращаем
		return await workbook.xlsx.writeBuffer()
	}

	// async lowerSeats(createEventDto:CreateEventDto){
	//   const event = await this.eventRepository.save({
	//     name:createEventDto.name,
	//     start_time: createEventDto.start_time,
	//     end_time: createEventDto.end_time,
	//     available_seats: createEventDto.available_seats-1
	//   });
	//   return {event};
	//
	// }
}
