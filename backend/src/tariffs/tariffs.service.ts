import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from 'src/config/supabase.client';
import { TariffsDto, UpdateTariffDto } from './dto/tariff.dto';

@Injectable()
export class TariffsService {
  //obtenr tarrifs
  async getTariffs(token: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb.from('tariffs').select('*').single();
    if (error) {
      throw new NotFoundException('Tariffs not found');
    }
    return data;
  }

  //crear tariff
  async createTariff(token: string, tariffData: TariffsDto) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('tariffs')
      .insert(tariffData)
      .single();
    if (error) {
      throw new Error('Error creating tariff');
    }
    return data;
  }

  //update tariff
  async updateTariff(
    token: string,
    tariffId: any,
    tariffUpdateData: UpdateTariffDto,
  ) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('tariffs')
      .update(tariffUpdateData)
      .eq('id', tariffId)
      .single();
    if (error) {
      throw new NotFoundException(`Tarif with id ${tariffId} not found`);
    }
    return data;
  }
}
