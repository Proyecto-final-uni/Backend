import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesGuard } from './vehicles.guard';
import { UpdateVehicleDto, VehiclesDto } from './dto/vehicles.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
  //obtener listado de vehicles
  @UseGuards(VehiclesGuard)
  @Get()
  async getVehicles(@Req() req) {
    const token = req.token;
    return this.vehiclesService.getVehicleList(token);
  }
  //obtner vehicles por id
  @UseGuards(VehiclesGuard)
  @Get(':id')
  async getVehicleById(@Req() req, @Param('id') vehicleId: string) {
    const token = req.token;
    return this.vehiclesService.getVehicleById(token, vehicleId);
  }
  //crear vehiculo
  @UseGuards(VehiclesGuard)
  @Post()
  async createVehicle(@Req() req, @Body() vehicleData: VehiclesDto) {
    const token = req.token;
    return this.vehiclesService.createVehicle(token, vehicleData);
  }
  //update vehicle
  @UseGuards(VehiclesGuard)
  @Patch(':id')
  async updateVehicle(
    @Req() req,
    @Param('id') vehicleId: string,
    @Body() vehicleUpdateData: UpdateVehicleDto,
  ) {
    const token = req.token;
    return this.vehiclesService.updateVehicle(
      token,
      vehicleId,
      vehicleUpdateData,
    );
  }
}
