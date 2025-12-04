import { IsDate, IsString, IsUUID, IsOptional } from 'class-validator';

export class DriversDto {
  @IsUUID()
  user_id: string;

  @IsString()
  full_name?: string;

  @IsString()
  dni?: string;

  @IsString()
  license_number?: string;

  @IsString()
  license_category?: string;

  @IsString()
  phone?: string;

  @IsDate()
  license_expiry?: Date;
}

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsDate()
  license_expiry?: Date;
}
