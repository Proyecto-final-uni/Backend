import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TariffsDto{
    @IsNumber()
    base_fare: number;

    @IsString()
    destination_id: string;
} 

export class UpdateTariffDto{
    @IsOptional()
    @IsNumber()
    base_fare?: number;
}