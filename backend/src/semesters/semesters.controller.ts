import { Controller, Post, Req, UseGuards, Body, Get, Patch, Param } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersGuard } from './semesters.guard';
import { SemestersDto, UpdateSemestersDto } from './dto/semesters.dto';

@Controller('semesters')
export class SemestersController {
  constructor(private readonly semestersService: SemestersService) {}
  //crear semestres
  @UseGuards(SemestersGuard)
  @Post()
  async createSemesters(@Req() req, @Body() semestersData: SemestersDto) {
    const token = req.token;
    return this.semestersService.createSemester(token,semestersData);
  }

  //obtener semestres
  @UseGuards(SemestersGuard)
  @Get()
  async getSemesters(@Req() req){
    const token = req.token;
    return this.semestersService.getSemesters(token);
  }

  //obtener semestre activo
  @UseGuards(SemestersGuard)
  @Get('active')
  async getActiveSmester(@Req() req){
    const token= req.token;
    return this.semestersService.getActiveSemester(token);
  }

  //update semestre
  @UseGuards(SemestersGuard)
  @Patch(':id')
  async updateSemester(@Req() req, @Param('id') semesterId: string, @Body() semesterUpdateData: UpdateSemestersDto){
    const token=req.token;
    return this.semestersService.updateSemester(token, semesterId, semesterUpdateData);
  }
}
