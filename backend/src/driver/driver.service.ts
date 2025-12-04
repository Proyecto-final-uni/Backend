import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from '../config/supabase.client';
import { DriversDto, UpdateDriverDto } from './dto/drivers.dto';

@Injectable()
export class DriverService {
  //crear un chofer
  async createDriver(authHeader: string, driverData: DriversDto) {
    const sb = createSupabaseClientForToken(authHeader);
    const { data, error } = await sb
      .from('drivers')
      .insert(driverData)
      .select()
      .single();
    if (error) {
      throw new Error(`Cant create the driver, Error: ${error.message}`);
    }
    return data;
  }

  //update drivers
  async updateDrivers(authHeader: string,id:string, driverUpdateData: UpdateDriverDto) {
    const sb = createSupabaseClientForToken(authHeader);
    const { data, error } = await sb
      .from('drivers')
      .update(driverUpdateData)
      .eq('user_id', id)
      .select('*')
      .single();
    if (error) {
      throw new Error(`Cant update the driver data, Error: ${error.message}`);
    }
    return data;
  }

  //obtener chofer by id
  async getDriverById(authHeader: string, driverId: string) {
    const sb = createSupabaseClientForToken(authHeader);
    const { data: dataDriver, error: errorDataDriver } = await sb
      .from('drivers')
      .select('*')
      .eq('user_id', driverId)
      .single();
    if (errorDataDriver) {
      throw new NotFoundException(
        `Cant found the driver, Error: ${errorDataDriver.message}`,
      );
    }
    return dataDriver;
  }

  //obtener listado de choferes
  async getDriverList(authHeader: string) {
    const sb = await createSupabaseClientForToken(authHeader);
    const { data: driverList, error: errorDriverList } = await sb
      .from('drivers')
      .select('*');
    if (errorDriverList) {
      throw new NotFoundException(
        `Cant return the dirvers list, Error: ${errorDriverList.message}`,
      );
    }
    return driverList;
  }
}
