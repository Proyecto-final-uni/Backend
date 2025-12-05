import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../config/supabase.client';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  //para obtener el perfil  (GET)
  async getPorfile(userId: string) {
    const { data, error } = await supabase.auth.getUser(userId);
    if (error) {
      console.log('Error al encotrar el usuario');
      throw new NotFoundException(error.message);
    }

    //obtener los datos de la tabla users que hice
    const { data: dataUser, error: errorUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (errorUser) {
      console.log('Error al obtener de la tabla user');
    }
    //logs para fijarme
    console.log('Auth user', data.user);
    console.log('Tabla users', dataUser);

    // Combinar datos de auth con user_status
    const combined = {
      ...data,
      user: {
        ...data.user,
        // Priorizar datos de users sobre user_metadata
        name: dataUser?.name || data.user.user_metadata?.name || '',
        phone: dataUser?.phone || data.user.user_metadata?.phone || '',
        role: dataUser?.role || data.user.user_metadata?.role || '',
      },
    };

    console.log('Combined result', combined);
    return combined;
  }
  //para actualizar el perfil   (PATCH)
  async updatePorfil(userId: string, updateUser: UpdateUserDto) {
    console.log('[UPDATE PORFILE],UserId:', userId);
    console.log('[UPDATE PORFILE],updateData:', JSON.stringify(updateUser));

    const { data, error } = await supabase
      .from('users')
      .upsert({ id: userId, ...updateUser }, { onConflict: 'id' })
      .select()
      .single();
    if (error) {
      console.log(
        `Error al actualizar datos del usuario, Error: ${error.message}`,
      );
      throw new NotFoundException(error.message);
    }

    return data;
  }
  // obtener la info de un usuario
  async getUserById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.log(`error al enconytrar usuario, error: ${error}`);
      throw new NotFoundException(error.message);
    }
    return data;
  }
  //obtener todos los usuarios 
  async getAllUsers(){
    const {data,error}=await supabase
      .from('users')
      .select('*');
    if (error) {
      console.log(`error al obtener todos los usuarios, error: ${error}`);
      throw new NotFoundException(error.message);
    }
    return data;
  }
}
