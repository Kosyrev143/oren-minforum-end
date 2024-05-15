import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Render,
	NotFoundException,
} from '@nestjs/common'
import { ProfileService } from './profile.service'
import {EventService} from "../event/event.service";

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService,
				private readonly eventService: EventService) {}

	@Get(':id')
	@Render('profile')
	async getProfile(@Param('id') id: number) {
		const user = await this.profileService.profile(id)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const name = user.name.toUpperCase();
		const surname = user.surname.toUpperCase();
		const middlename = user.middlename.toUpperCase();
		const events = await Promise.all(user.events.map(eventId => this.eventService.findOne(eventId)));
		const district = user.district.toUpperCase();

		return {
			name,
			surname,
			middlename,
			events,
			district,
		};
	}
}
