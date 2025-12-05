import { Injectable, NotFoundException } from '@nestjs/common';
import { createSupabaseClientForToken } from '../config/supabase.client';
import { ProfessorsDto} from './dto/professor.dto';

@Injectable()
export class ProfessorsService {
  //metodo para obtener todos los profesores del problema

  async listPorfessors(token: string) {
    const sb = createSupabaseClientForToken(token);

    const { data, error } = await sb.from('professors').select('*');
    if (error) {
      throw new NotFoundException(`Cant check the professor ${error.message}`);
    }
    return data;
  }

  //metodo para obtener porfesores por un id
  async getProfessorById(token: string, professorId: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('professors')
      .select('*')
      .eq('id', professorId)
      .single();
    if (error) {
      throw new NotFoundException(
        `Can not fid the professor whith id:${professorId},Error: ${error.message}`,
      );
    }
    return data;
  }

  //metodo para crear un profesor
  async createProfessor(token: string, professorData: ProfessorsDto) {
    const sb = createSupabaseClientForToken(token);

    const { data, error } = await sb
      .from('professors')
      .insert(professorData) // Inserta directamente todo el DTO (incluye user_id)
      .select()
      .single();
      
    if (error) {
      throw new NotFoundException(`Cant create the professor, Error: ${error.message}`);
    }
    return data;
  }
}
