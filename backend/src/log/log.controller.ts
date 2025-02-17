import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogService } from './log.service';
import { LogDto } from './models/log.dto';

@Controller('logs')
@ApiTags('Logs')
@UseGuards(JwtAuthGuard)
export class LogController {
	constructor(private readonly logService: LogService) {}

	@Get()
	@ApiOperation({ summary: 'Get all logs' })
	@ApiOkResponse({ isArray: true })
	async getAll(): Promise<LogDto[]> {
		return await this.logService.getAll();
	}

	@Delete()
	@ApiOperation({ summary: 'Delete all logs' })
	async deleteAll() {
		return this.logService.deleteAll();
	}
}
