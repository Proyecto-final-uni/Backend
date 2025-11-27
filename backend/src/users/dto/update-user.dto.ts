import { IsIn, IsOptional, IsString } from "class-validator"

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    phone?:string;

    @IsOptional()
    @IsIn(['admin','coordinador','profesor','chofer'])
    role?:'admin'|'coordinador'|'profesor'|'chofer';
}