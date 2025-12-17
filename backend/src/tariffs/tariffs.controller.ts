import { Controller, Get, Post, Patch, Req, UseGuards, Body, Param } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { TariffsDto, UpdateTariffDto } from './dto/tariff.dto';
import { TariffsGuard } from './tariffs.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}
  // obtener todas las tarifas
  @UseGuards(TariffsGuard)
  @Get()
  async getTariffs(@Req() req){
    const token=req.token;
    return this.tariffsService.getTariffs(token);
  }

  //crear una tarifa 
  @UseGuards(AdminGuard)
  @Post()
  async createTariff(@Req() req, tariffData: TariffsDto){
    const token=req.token;
    return this.tariffsService.createTariff(token, tariffData);
  }

  //actualizar tarifa
  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateTariff(@Req() req,@Param('id') tariffId :string , @Body() tariffUpdate:UpdateTariffDto){
    const token=req.token;
    return this.tariffsService.updateTariff(token, tariffId, tariffUpdate);
  }


}
