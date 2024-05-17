import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ICreateEmail, ICreateEmail2 } from './interfaces/createEmail.interface'
import { EventService } from '../event/event.service'

@Injectable()
export class EmailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly eventService: EventService,
	) {}

	async sendEmail({
		name,
		surname,
		middlename,
		qrcode,
		email,
		id,
		events: eventIds,
	}: ICreateEmail): Promise<string> {
		const events = await Promise.all(
			eventIds.map((eventId) => this.eventService.findOne(eventId)),
		)

		await this.mailerService.sendMail({
			to: email, // Specify the recipient email address here
			subject: 'Заявка на бронирование',
			template: 'confirmation',
			context: {
				qrcode,
				name,
				surname,
				middlename,
				id,
				events,
			},
		})
		return 'email sent'
	}

	async sendEmailConfirmation2({
		name,
		surname,
		middlename,
		qrcode,
		id,
		events: eventIds,
	}: ICreateEmail): Promise<string> {
		const events = await Promise.all(
			eventIds.map((eventId) => this.eventService.findOne(eventId)),
		)

		await this.mailerService.sendMail({
			to: 'kosyrevartem76@gmail.com', // Здесь указываем адрес получателя
			subject: 'Оставлена заявка на бронирование',
			template: 'confirmation2', // Используем другой шаблон
			context: {
				qrcode,
				name: name.toUpperCase(),
				surname: surname.toUpperCase(),
				middlename: middlename.toUpperCase(),
			},
		})

		return 'Email sent'
	}

	async sendEmailConfirmation3({
		name,
		surname,
		middlename,
		qrcode,
		id,
		events: eventIds,
		post,
		organization,
	}: ICreateEmail2): Promise<string> {
		const events = await Promise.all(
			eventIds.map((eventId) => this.eventService.findOne(eventId)),
		)

		await this.mailerService.sendMail({
			to: 'forum@mail.orb.ru', // Здесь указываем адрес получателя
			subject: 'Оставлена заявка на бронирование',
			template: 'confirmation3', // Используем другой шаблон
			context: {
				qrcode,
				name: name.toUpperCase(),
				surname: surname.toUpperCase(),
				middlename: middlename.toUpperCase(),
				post: post.toUpperCase(),
				organization: organization.toUpperCase(),
			},
		})

		return 'Email sent'
	}
}
