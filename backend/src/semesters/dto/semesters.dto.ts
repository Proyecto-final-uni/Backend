import { IsInt, IsOptional, IsString, IsISO8601 } from 'class-validator'

export class SemestersDto {
    @IsString()
    name: string;

    @IsISO8601()
    start_date: string;

    @IsISO8601()
    end_date: string;

    @IsInt()
    max_trips_per_professor: number;
}

export class UpdateSemestersDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsISO8601()
    start_date?: string;
    
    @IsOptional()
    @IsISO8601()
    end_date?: string;

    @IsOptional()
    @IsInt()
    max_trips_per_professor?: number;
}