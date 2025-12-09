import { Controller, Get, Param, Post, Req, UseGuards,Body } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsGuard } from './destinations.guard';
import { DestinationDto } from './dto/destinations.dto';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}
  //obtener todos los destinos
  @UseGuards(DestinationsGuard)
  @Get()
  async getDestinations(@Req() req ){
    const token=req.token;
    return this.destinationsService.getDestinations(token);
  }

  //obtener destino por id 
  @UseGuards(DestinationsGuard)
  @Get(':id')
  async getDestinationById(@Req() req, @Param('id') id : string){
    const token=req.token;
    return this.destinationsService.getDestinationById(token, id);
  }

  //agregar destinos
  @UseGuards(DestinationsGuard)
  @Post()
  async addDestination(@Req() req, @Body() destinationData: DestinationDto){
    const token=req.token;
    return this.destinationsService.addDestination(token, destinationData);
  }
}
