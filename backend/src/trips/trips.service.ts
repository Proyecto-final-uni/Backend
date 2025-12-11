import { Injectable, NotFoundException } from '@nestjs/common';
import { TripsDto } from './dto/trips.dto';
import {
  validateLastThursdayOfMonth,
  validateDriverTripDate,
  validateVehicleOperational,
} from './validations/validations';
import { createSupabaseClientForToken } from 'src/config/supabase.client';

@Injectable()
export class TripsService {
  //crear un trip
  async createTrip(token: string, tripData: TripsDto) {
    const sb = createSupabaseClientForToken(token);
    //valido que la fecha sea el ultimo jueves del mes
    validateLastThursdayOfMonth(tripData.date);
    //valido que el chofer no tenga otro viaje ese dia
    await validateDriverTripDate(token, tripData.driver_id, tripData.date);
    //valido que el vehiculo este operativo
    await validateVehicleOperational(token, tripData.vehicle_id);
    //obtengo la capacidad del vehiculo
    const { data: vehicleData, error: vehicleError } = await sb
      .from('vehicles')
      .select('capacity')
      .eq('id', tripData.vehicle_id)
      .single();
    if (vehicleError || !vehicleData) {
      throw new NotFoundException(
        `Can't find vehicle data: ${vehicleError?.message || 'Vehicle not found'}`,
      );
    }
    //creo el viaje
    const { data: trip, error } = await sb
      .from('trips')
      .insert([tripData])
      .select()
      .single();
    if (error) {
      throw new Error(`Can't create trip: ${error.message}`);
    }
    
    //creo los asientos automatico
    const seats = [];
    for (let i = 1; i <= vehicleData.capacity; i++) {
      seats.push({
        trip_id: trip.id,
        seat_number: i,
        is_available: false,
      });
    }

    const { error: seatsError } = await sb.from('seats').insert(seats);
    
    // Si falla la creación de asientos, eliminar el viaje
    if (seatsError) {
      // Rollback: eliminar el viaje que acabamos de crear
      await sb.from('trips').delete().eq('id', trip.id);
      
      throw new Error(
        `Can't create seats: ${seatsError.message}. Trip was rolled back.`
      );
    }

    return trip;
  }
  //obtener todos los trips
  async getAllTrips(token: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb.from('trips').select();
    if (error) {
      throw new NotFoundException(`Can't get trips: ${error.message}`);
    }
    return data;
  }
  //obtener un trip por id
  async getTripById(token: string, tripId: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('trips')
      .select()
      .eq('id', tripId)
      .single();
    if (error) {
      throw new NotFoundException(
        `Trip with id ${tripId} not found: ${error.message}`,
      );
    }
    return data;
  }
  //obtener hacientos de un trip
  async getTripSeatsById(token: string, tripId: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('seats')
      .select('*')
      .eq('trip_id', tripId);
    if (error) {
      throw new NotFoundException(
        `Seats for trip with id ${tripId} not found: ${error.message}`,
      );
    }
    return data;
  }
}
