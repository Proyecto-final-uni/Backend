import{ IsISO8601, IsString } from 'class-validator';
export class TripsDto{
    @IsISO8601()
    date: string;

    @IsString()
    vehicle_id: string;

    @IsString()
    driver_id:string;

    @IsString()
    semester_id: string;

    @IsString()
    status: string;

    @IsString()
    destinations_id: string; 

}