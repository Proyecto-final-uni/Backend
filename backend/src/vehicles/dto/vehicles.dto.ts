import { IsString, IsNumber, IsOptional, IsJSON, IsIn } from 'class-validator';

export class VehiclesDto {
    @IsString()
    plate?:string;

    @IsString()
    brand?:string;

    @IsString()
    model?:string;

    @IsNumber()
    capacity?:number;

    @IsString()
    @IsIn(['operational', 'inactive', 'maintenance'])
    state?:string;

    @IsOptional()
    @IsJSON()
    @IsString()
    features?:string
}

export class UpdateVehicleDto {
    @IsOptional()
    @IsString()
    @IsIn(['operational', 'inactive', 'maintenance'])
    state?:string;

    @IsOptional()
    @IsJSON()
    @IsString()
    features?:string

    @IsOptional()
    @IsNumber()
    capacity?:number;
}