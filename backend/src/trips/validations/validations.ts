import { BadRequestException } from '@nestjs/common';
import { createSupabaseClientForToken } from 'src/config/supabase.client';

//validar que el chofer no tenga otro viaje ese dia

export async function validateDriverTripDate(
  token: string,
  driverId: string,
  tripDate: string,
) {
  const sb = createSupabaseClientForToken(token);
  const { data: existingTrips, error } = await sb
    .from('trips')
    .select('*')
    .eq('driver_id', driverId)
    .eq('date', tripDate);
  if (error) {
    throw new Error(`Error validating driver trip date: ${error.message}`);
  }
  if (existingTrips && existingTrips.length > 0) {
    throw new BadRequestException(
      `Driver with id ${driverId} already has a trip on date ${tripDate}`,
    );
  }
}

//validar que el vehiculo este operativo 
export async function validateVehicleOperational(token: string, vehicleId: string) {
    const sb = createSupabaseClientForToken(token);
    const{data: vehicle,error}=await sb 
        .from('vehicles')
        .select('state')
        .eq('id',vehicleId)
        .single();
    if(error || !vehicle){
        throw new BadRequestException(`Error validating vehicle operational state: ${error?.message || 'Vehicle not found'}`);
    }

    if(vehicle.state !=='operational'){
        throw new BadRequestException(`Vehicle with id ${vehicleId} is not operational.`);
    }
}

//calcular el ultimo jueves del mes
function getLastThursdayOfMonth(year: number, month: number): Date {
    const lastDay = new Date(year, month + 1, 0);
    const dayOfWeek = lastDay.getDay();
    const daysToThursday = (dayOfWeek + 3) % 7;
    const lastThursday = new Date(lastDay);
    lastThursday.setDate(lastDay.getDate() - daysToThursday);
    return lastThursday;
}

//validar que la fecha sea el ultimo jueves del mes
export function validateLastThursdayOfMonth(tripDate: string) {
    const date = new Date(tripDate);
    const lastThursday = getLastThursdayOfMonth(date.getFullYear(), date.getMonth());
    
    // Comparar solo la fecha (ignorar hora)
    const tripDateOnly = date.toISOString().split('T')[0];
    const lastThursdayOnly = lastThursday.toISOString().split('T')[0];
    
    if (tripDateOnly !== lastThursdayOnly) {
        throw new BadRequestException(
            `Trip date must be the last Thursday of the month. Expected: ${lastThursdayOnly}, but got: ${tripDateOnly}`
        );
    }
}


    

