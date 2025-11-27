import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //configuracion de cors 
  app.enableCors({
    origin:[
      'https://backend-7uto.onrender.com',
      'http://localhost:3001'
    ]
  });
  // Activar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
