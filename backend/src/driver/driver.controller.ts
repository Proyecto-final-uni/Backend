import {
  Controller,
  UseGuards,
  Req,
  Body,
  Post,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriversGuard } from './drivers.guard';
import { DriversDto, UpdateDriverDto } from './dto/drivers.dto';
import { AdminGuard } from '../auth/admin.guard';
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  //crear un driver (solo admin)
  @UseGuards(AdminGuard)
  @Post()
  async createDriver(@Req() req, @Body() driverData: DriversDto) {
    const token = req.token;
    return this.driverService.createDriver(token, driverData);
  }

  //obtener listado de drivers
  @UseGuards(DriversGuard)
  @Get()
  async getDriverList(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.driverService.getDriverList(token);
  }

  //obtener driver por id
  @UseGuards(DriversGuard)
  @Get(':id')
  async getDriverById(@Req() req, @Param('id') driverId: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.driverService.getDriverById(token, driverId);
  }

  //update driver (solo admin)
  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateDriver(
    @Req() req,
    @Param('id') driverId: string,
    @Body() driverData: UpdateDriverDto,
  ) {
    const token=req.headers.authorization.split(' ')[1];
    return this.driverService.updateDrivers(token, driverId, driverData);
  }
}
