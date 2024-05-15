import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {EventModule} from "../event/event.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
      EventModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],


})
export class ProfileModule {}
