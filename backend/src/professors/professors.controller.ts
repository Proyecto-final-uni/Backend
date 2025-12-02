import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsDto } from './dto/professor.dto';
import { ProfessorsGuard } from './professors.guard';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  // Obtener todos los profesores
  @UseGuards(ProfessorsGuard)
  @Get()
  async listProfessors(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.professorsService.listPorfessors(token);
  }

  // Obtener profesor por ID
  @UseGuards(ProfessorsGuard)
  @Get(':id')
  async getProfessorById(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.professorsService.getProfessorById(token, id);
  }

  // Crear un nuevo profesor
  @UseGuards(ProfessorsGuard)
  @Post()
  async createProfessor(@Req() req, @Body() professorData: ProfessorsDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.user.id; // Del guard que ya valida el token
    return this.professorsService.createProfessor(token, userId, professorData);
  }
}
