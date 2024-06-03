import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    age: number;

    @IsBoolean()
    isActive: boolean;
}
