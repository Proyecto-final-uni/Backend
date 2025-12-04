import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class DriversGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('🔑 [DriversGuard] Iniciando validación de token');
    //leemos el header
    const authHeader = request.headers['authorization'];
    console.log('🔑 [DriversGuard] Authorization header:', authHeader ? `Bearer ${authHeader.split(' ')[1]?.substring(0, 20)}...` : 'No header');
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('🔑 [DriversGuard] Error: Missing authorization header');
        throw new UnauthorizedException('Missing authorization header');
    }
    //Eextraemos el token
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('🔑 [DriversGuard] Error: Invalid Authorization header format');
      throw new UnauthorizedException('Inavlid Authorization header format');
    }

    //validamos el token
    try{
        const secret = process.env.SUPABASE_JWT_SECRET;
        console.log('🔑 [DriversGuard] JWT Secret disponible:', secret ? 'SÍ' : 'NO');
        let payload: any;

        if(secret){
            //verifica firma y expiracion del token
            payload = jwt.verify(token, secret) as any;
            console.log('🔑 [DriversGuard] Token verificado con secret');
        } else {
            payload = jwt.decode(token) as any;
            console.log('🔑 [DriversGuard] Token decodificado sin verificación');
            if(!payload){
                throw new UnauthorizedException('Invalid token');
            }
        }

        console.log('🔑 [DriversGuard] Payload decodificado:', {
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
        
        console.log('🔑 [DriversGuard] Usuario asignado:', request.user);
        console.log('🔑 [DriversGuard] ✅ Validación exitosa');
        
        return true;
    }catch(err:any){
    console.log('🔑 [DriversGuard] ❌ Error validando token:', err.message);
    throw new UnauthorizedException('Invalid token');
  }
    
  }
}
