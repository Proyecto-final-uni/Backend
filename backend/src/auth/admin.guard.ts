import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('🔐 [AdminGuard] Validando token y rol de administrador');
    
    const authHeader = request.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    try {
      const secret = process.env.SUPABASE_JWT_SECRET;
      let payload: any;

      if (secret) {
        payload = jwt.verify(token, secret) as any;
      } else {
        payload = jwt.decode(token) as any;
        if (!payload) {
          throw new UnauthorizedException('Invalid token');
        }
      }

      const userRole = payload.user_metadata?.role || payload.role || 'cliente';

      // ✅ VALIDACIÓN DE ROL ADMIN
      if (userRole !== 'admin') {
        console.log(`🔐 [AdminGuard] ❌ Acceso denegado. Rol actual: ${userRole}`);
        throw new ForbiddenException('Only administrators can perform this action');
      }

      request.user = {
        id: payload.sub || payload.user_id,
        email: payload.email,
        role: userRole,
      };

      request.token = token;

      console.log('🔐 [AdminGuard] ✅ Admin verificado:', request.user.email);
      return true;

    } catch (err: any) {
      if (err instanceof ForbiddenException) {
        throw err;
      }
      console.log('🔐 [AdminGuard] ❌ Error:', err.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
