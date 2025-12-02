import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessorsModule } from './professors/professors.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [AuthModule, UsersModule, ProfessorsModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
