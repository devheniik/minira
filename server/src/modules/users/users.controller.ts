// src/users/users.controller.ts
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards,} from '@nestjs/common';
import {UsersService} from './users.service';
import {RegisterDto} from './dto/register.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserEntity} from './entities/user.entity';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

  @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.usersService.register(registerDto)

        return this.authService.token(user)
    }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async profile() {
      const id = 1
      return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
      return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
      return new UserEntity(await this.usersService.remove(id));
  }
}
