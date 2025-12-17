import { IsNumber, IsString } from 'class-validator';

export class TariffsDto{
    @IsNumber()
    base_fare: number;

    @IsString()
    destination_id: string;
} 

export class UpdateTariffDto{
    @IsNumber()
    base_fare?: number;
}