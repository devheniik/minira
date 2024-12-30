import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('log')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createLogDto: CreateLogDto) {
        return this.logsService.create(createLogDto);
    }
}
