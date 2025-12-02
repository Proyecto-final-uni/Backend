import {
    IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsPhoneNumber,
  isString,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
export class ProfessorsDto{
    @IsUUID()
    user_id: string;

    @IsString()
    full_name?:string;

    @IsString()
    dni?:string;

    @IsString()
    faculty?:string;

    @IsString()
    department?:string;

    @IsString()
    phone?:string;

    @IsString()
    province_default?:string;

    @IsString()
    category?:string;

    @IsOptional()
    @IsBoolean()
    is_active?:boolean=true;

    @IsString()
    subject?:string;

}