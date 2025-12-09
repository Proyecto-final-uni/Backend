import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from 'src/config/supabase.client';
import { DestinationDto } from './dto/destinations.dto';

@Injectable()
export class DestinationsService {
  //obtener todos los destinos
  async getDestinations(token: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb.from('destinations').select('*');
    if (error) {
      throw new NotFoundException(`Cant get destinations: ${error.message}`);
    }
    return data;
  }
  //obtener destino por id
  async getDestinationById(token: string, id: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw new NotFoundException(
        `Cant get destination by id: ${error.message}`,
      );
    }
    return data;
  }
  //agregar un destino
  async addDestination(token: string, destinationData: DestinationDto) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('destinations')
      .insert([destinationData])
      .select();
    if (error) {
      throw new Error(`Cant add destination: ${error.message}`);
    }
    return data;
  }
}
