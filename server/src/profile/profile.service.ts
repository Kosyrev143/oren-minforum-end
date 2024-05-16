import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	async profile(id: number) {
		const user = await this.userRepository.findOne({ where: { id } })
		return user
	}
}
