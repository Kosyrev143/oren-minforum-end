import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { UpdateQrcodeDto } from './dto/update-qrcode.dto';
import {InjectRepository} from "@nestjs/typeorm";
import * as qrcode from 'qrcode';
import {Column, JoinColumn, ManyToOne, Repository} from "typeorm";
import {Qrcode} from "./entities/qrcode.entity";


@Injectable()
export class QrcodeService {

  constructor(@InjectRepository(Qrcode) private readonly qrcodeRepository:Repository<Qrcode>, ) {
  }

  async create(createQrcodeDto:CreateQrcodeDto){
    try {
      const qrCodeUrl = await qrcode.toDataURL(createQrcodeDto.url)

      await this.qrcodeRepository.save({
        booking: createQrcodeDto.booking,
        url: qrCodeUrl
      });

      return qrCodeUrl;
    }catch (error) {
      throw new Error('Failed to generate QR code.');
    }


  }

  async remove( id:number) {
    const existQrcode = await this.qrcodeRepository.findOne({
      where: {
        id: id,
      },
    });
    if(existQrcode){
      await this.qrcodeRepository.delete(id);
    }
    else{
      throw new BadRequestException('Такого пользователся не существует')
    }


  }

}
