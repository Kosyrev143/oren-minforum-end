import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Qrcode} from "./entities/qrcode.entity";
import {BookingModule} from "../booking/booking.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([Qrcode])
  ],
  controllers: [QrcodeController],
  providers: [QrcodeService],
  exports:[QrcodeService]
})
export class QrcodeModule {}
