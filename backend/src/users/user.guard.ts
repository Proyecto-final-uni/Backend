import {  CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { supabase } from '../config/supabase.client';
import { REQUEST } from "@nestjs/core";

@Injectable()
export class  UserGuards implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();

        //leer el header
        const authHeader=request.headers['authorization'];
        if(!authHeader){
            throw new UnauthorizedException('Missing authorization header');
        }
        //extraigo el token
        const token = authHeader.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('Inavlid Authorization header format');
        }

        const {data,error}=await supabase.auth.getUser(token);
        if(error || !data.user){
            throw new UnauthorizedException('Invalid or expired token');
        }

        request.user=data.user;
        return true;
    }
}