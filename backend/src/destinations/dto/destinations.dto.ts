import { IsInt, IsString } from 'class-validator'; 

export class DestinationDto {
    
    @IsString()
    province: string;

    @IsInt()
    order_index: number;
}