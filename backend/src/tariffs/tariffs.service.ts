import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from 'src/config/supabase.client';
import { TariffsDto, UpdateTariffDto } from './dto/tariff.dto';

@Injectable()
export class TariffsService {
  //obtener todas las tarifas
  async getTariffs(token: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb.from('tariffs').select('*');
    if (error) {
      throw new NotFoundException(`Can't get tariffs: ${error.message}`);
    }
    return data;
  }

  //crear tariff
  async createTariff(token: string, tariffData: TariffsDto) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('tariffs')
      .insert([tariffData])
      .select()
      .single();
    if (error) {
      throw new Error(`Can't create tariff: ${error.message}`);
    }
    return data;
  }

  //update tariff
  async updateTariff(
    token: string,
    tariffId: string,
    tariffUpdateData: UpdateTariffDto,
  ) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('tariffs')
      .update(tariffUpdateData)
      .eq('id', tariffId)
      .select()
      .single();
    if (error) {
      throw new NotFoundException(`Tariff with id ${tariffId} not found: ${error.message}`);
    }
    return data;
  }
}
