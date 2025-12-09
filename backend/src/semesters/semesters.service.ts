import { Injectable, NotFoundException } from '@nestjs/common';

import { createSupabaseClientForToken } from 'src/config/supabase.client';
import { SemestersDto, UpdateSemestersDto } from './dto/semesters.dto';

@Injectable()
export class SemestersService {
  //crear un nuevo semestre
  async createSemester(token: string, semesterData: SemestersDto) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('semesters')
      .insert([semesterData])
      .select()
      .single();
    if (error) {
      throw new Error(`Cant create the semester, Error: ${error.message}`);
    }
    return data;
  }
  //obtener semestres
  async getSemesters(token: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb.from('semesters').select('*');
    if (error) {
      throw new NotFoundException(
        `Cant get the semesters, Error: ${error.message}`,
      );
    }
    return data;
  }
  //obtener semestre por id
  async getSemesterById(token: string, semesterId: string) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('semesters')
      .select('*')
      .eq('id', semesterId)
      .single();
    if (error) {
      throw new NotFoundException(
        `Cant get the semester by id, Error: ${error.message}`,
      );
    }
    return data;
  }
  //para obtener semestre activo
  async getActiveSemester(token: string) {
    const sb = createSupabaseClientForToken(token);
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await sb
      .from('semesters')
      .select('*')
      .lte('start_date', today)
      .gte('end_date', today)
      .order('start_date', { ascending: false })
      .limit(1);
    if (error) {
      throw new NotFoundException(
        `Cant get the active semester, Error: ${error.message}`,
      );
    }
    return data;
  }
  //actualizar semestre
  async updateSemester(
    token: string,
    semesterId: string,
    semesterUpdateData: UpdateSemestersDto,
  ) {
    const sb = createSupabaseClientForToken(token);
    const { data, error } = await sb
      .from('semesters')
      .update(semesterUpdateData)
      .eq('id', semesterId)
      .select('*')
      .single();
    if (error) {
      throw new NotFoundException(
        `Cant update the semester, Error: ${error.message}`,
      );
    }
    return data;
  }
}
