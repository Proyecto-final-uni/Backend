import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsDto } from './dto/professor.dto';
import { ProfessorsGuard } from './professors.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  // Obtener todos los profesores
  @UseGuards(ProfessorsGuard)
  @Get()
  async listProfessors(@Req() req) {
    const token = req.token;
    return this.professorsService.listPorfessors(token);
  }

  // Obtener profesor por ID
  @UseGuards(ProfessorsGuard)
  @Get(':id')
  async getProfessorById(@Req() req, @Param('id') id: string) {
    const token = req.token;
    return this.professorsService.getProfessorById(token, id);
  }

  // Crear un nuevo profesor (solo admin)
  @UseGuards(AdminGuard)
  @Post()
  async createProfessor(@Req() req, @Body() professorData: ProfessorsDto) {
    const token = req.token;
    return this.professorsService.createProfessor(token, professorData);
  }
}
