import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from 'src/config/supabase.client';
import { UpdateVehicleDto, VehiclesDto } from './dto/vehicles.dto';

@Injectable()
export class VehiclesService {
    //crear vehiculo
    async createVehicle(token: string,  vehicleData:VehiclesDto){
        const sb = createSupabaseClientForToken(token);
        const {data,error}=await sb 
            .from('vehicles')
            .insert(vehicleData)
            .select()
            .single();
        if(error){
            throw new Error(`Cant create the vehicle, Error: ${error.message}`);
        }
        return data;
    }
    //obtener lista de vehiculos
    async getVehicleList(token: string){
        const sb = createSupabaseClientForToken(token);
        const {data,error}= await sb 
            .from('vehicles')
            .select('*');
        if(error){
            throw new NotFoundException(`Cant return the vehicles list, Error: ${error.message}`);
        }
        return data;
    }
    //obtener datos de un vehiculo 
    async getVehicleById(token:string, vehicleId:string){
        const sb = await createSupabaseClientForToken(token);
        const{data,error}=await sb
            .from('vehicles')
            .select('*')
            .eq('id',vehicleId)
            .single();
        if(error){
            throw new NotFoundException(`Cant found the vehicle, Error: ${error.message}`);
        }
        return data;
    }
    //update vehicle 
    async updateVehicle(token: string, vehicleId: string, vehicleUpdateData: UpdateVehicleDto){
        const sb = createSupabaseClientForToken(token);
        const {data,error}=await sb 
            .from('vehicles')
            .update(vehicleUpdateData)
            .eq('id',vehicleId)
            .select('*')
            .single();
        if(error){
            throw new Error(`Cant update the vehicle data, Error: ${error.message}`);
        }
        return data;
    }
}
