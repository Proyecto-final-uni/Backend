import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsGuard } from './trips.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { TripsDto } from './dto/trips.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}
  //obtener todos los trips
  @UseGuards(TripsGuard)
  @Get()
  async getAllTrips(@Req() req) {
    const token = req.token;
    return this.tripsService.getAllTrips(token);
  }

  //obtener trip por id
  @UseGuards(TripsGuard)
  @Get(':id')
  async getTripById(@Req() req, @Param('id') tripId: string) {
    const token = req.token;
    return this.tripsService.getTripById(token, tripId);
  }

  //obtener asientos de un trip
  @UseGuards(TripsGuard)
  @Get(':id/seats')
  async getTripSeatsById(@Req() req, @Param('id') tripId: string) {
    const token = req.token;
    return this.tripsService.getTripSeatsById(token, tripId);
  }

  //crear un trip
  @UseGuards(AdminGuard)
  @Post()
  async createTrip(@Req() req, @Body() tripData: TripsDto) {
    const token = req.token;
    return this.tripsService.createTrip(token, tripData);
  }
}
