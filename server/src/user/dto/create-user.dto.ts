import {ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    surname: string

    @IsNotEmpty()
    @IsString()
    middlename: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    phone:string

    @IsNotEmpty()
    @IsString()
    organization: string

    @IsNotEmpty()
    @IsString()
    post: string

    @IsOptional() // Сделать поле необязательным
    @IsString()
    district: string

   @IsArray()
   events: number[]
}
