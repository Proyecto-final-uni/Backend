import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessorsModule } from './professors/professors.module';
import { DriverModule } from './driver/driver.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DestinationsModule } from './destinations/destinations.module';
import { SemestersModule } from './semesters/semesters.module';

@Module({
  imports: [AuthModule, UsersModule, ProfessorsModule, DriverModule, VehiclesModule, DestinationsModule, SemestersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
