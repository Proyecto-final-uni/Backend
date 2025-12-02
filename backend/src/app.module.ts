import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [AuthModule, UsersModule, ProfessorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
