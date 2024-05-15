import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Render, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as qrcode from 'qrcode';
import {User} from "./entities/user.entity";
import { Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('delete/:id')
  @Render('dop')
  root(@Param('id') id: number) {
    return { id:  id};
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('export/users')
  async exportUsersToExcel(@Res() res: Response) {
    const buffer = await this.userService.exportUsersToExcel();

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=users.xlsx',
      'Content-Length': buffer.byteLength,
    });

    res.send(buffer);
  }
}
