import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class SemestersGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('🔑 [SemestersGuard] Iniciando validación de token');
    //leemos el header
    const authHeader = request.headers['authorization'];
    console.log('🔑 [SemestersGuard] Authorization header:', authHeader ? `Bearer ${authHeader.split(' ')[1]?.substring(0, 20)}...` : 'No header');
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('🔑 [SemestersGuard] Error: Missing authorization header');
        throw new UnauthorizedException('Missing authorization header');
    }
    //Eextraemos el token
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('🔑 [SemestersGuard] Error: Invalid Authorization header format');
      throw new UnauthorizedException('Inavlid Authorization header format');
    }

    //validamos el token
    try{
        const secret = process.env.SUPABASE_JWT_SECRET;
        console.log('🔑 [SemestersGuard] JWT Secret disponible:', secret ? 'SÍ' : 'NO');
        let payload: any;

        if(secret){
            //verifica firma y expiracion del token
            payload = jwt.verify(token, secret) as any;
            console.log('🔑 [SemestersGuard] Token verificado con secret');
        } else {
            payload = jwt.decode(token) as any;
            console.log('🔑 [SemestersGuard] Token decodificado sin verificación');
            if(!payload){
                throw new UnauthorizedException('Invalid token');
            }
        }

        console.log('🔑 [SemestersGuard] Payload decodificado:', {
            sub: payload.sub,
            email: payload.email,
            role: payload.user_metadata?.role || payload.role,
            aud: payload.aud,
            iss: payload.iss
        });

        // SIEMPRE asignar el usuario después de verificar/decodificar
        request.user = {
            id: payload.sub || payload.user_id || payload?.user_metadata?.sub,
            email: payload.email || payload.user_email || payload?.user_metadata?.email,
            role: payload.user_metadata?.role || payload.role || 'cliente',
        };
        
        request.token = token;
        
        console.log('🔑 [SemestersGuard] Usuario asignado:', request.user);
        console.log('🔑 [SemestersGuard] ✅ Validación exitosa');
        
        return true;
    }catch(err:any){
    console.log('🔑 [SemestersGuard] ❌ Error validando token:', err.message);
    throw new UnauthorizedException('Invalid token');
  }
    
  }
}
