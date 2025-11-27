import { IsIn, IsOptional, IsString } from "class-validator"

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    phone?:string;

    @IsOptional()
    @IsString()
    @IsIn(['professor','driver'])
    role?:string;

}