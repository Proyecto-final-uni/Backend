import { Controller, UseGuards ,Req, Patch, Body,Get, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserGuards } from './user.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //obtenre perfil de usuario
  @UseGuards(UserGuards)
  @Get('me')
  async getMe(@Req() req){
    console.log('[GET /users/me]');
    const token=req.headers.authorization?.split(' ')[1];
    return this.usersService.getPorfile(token);
  }

  //update
  @UseGuards(UserGuards)
  @Patch('me')
  async updatePorfile(@Req() req, @Body() updateUserDto:UpdateUserDto){
    console.log('[PATCH /users/me] Iniciado');
    console.log('[PATCH /users/me] User ID from req.user:', req.user?.id);
    console.log('[PATCH /users/me] Update data received:', JSON.stringify(updateUserDto));
    console.log('[PATCH /users/me] Update data keys:', Object.keys(updateUserDto));
    console.log('[PATCH /users/me] Name value:', updateUserDto.name);
    console.log('[PATCH /users/me] Phone value:', updateUserDto.phone);
    console.log('[PATCH /users/me] Role value:', updateUserDto.role);

    return this.usersService.updatePorfil(req.user.id, updateUserDto);
  }

  //obtener perfil por id 
  @UseGuards(UserGuards)
  @Get(':id')
  async getUserById(@Param('id') id :string){
    console.log(['GET /users/:id] iniciado con ID:', id]);
    return this.usersService.getUserById(id);
  }
  
}
