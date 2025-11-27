import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { supabase } from '../config/supabase.client';
@Injectable()
export class AuthService {
  //funcion para el sing-in
  async register(userDto: AuthDto) {
    const { data, error } = await supabase.auth.signUp({
      email: userDto.email,
      password: userDto.password,
      options: {
        data: {
          role: userDto.role,
          name: userDto.name,
          phone: userDto.phone,
        },
      },
    });
    if (error) {
      throw new UnauthorizedException(error.message);
    }

    //guardar el userio en tabla users
    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from('users').insert({
        user_id: userId,
        role: userDto.role,
        name: userDto.name,
        phone: userDto.phone,
      });
      if (insertError) {
        throw new UnauthorizedException(insertError.message);
      }
    }
    return data;
  }

  //funcion para el login
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new UnauthorizedException(error.message);
    }
    return data;
  }
}
