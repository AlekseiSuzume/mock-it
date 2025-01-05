import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogService } from './log.service';
import { LogModel } from './models/log.model';

@Controller('logs')
@ApiTags('Logs')
@UseGuards(JwtAuthGuard)
export class LogController {
	constructor(private readonly mockService: LogService) {}

	@Get()
	@ApiOperation({ summary: 'Get all logs' })
	@ApiOkResponse({ isArray: true })
	async getAll(): Promise<LogModel[]> {
		return await this.mockService.getAll();
	}
}
