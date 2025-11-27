import {IsEmail,IsString,MinLength} from 'class-validator';
export class LogingDTO{
    @IsString()
    @MinLength(6,{message:'Password is too short'})
    password: string;

    @IsEmail()
    email:string;
}