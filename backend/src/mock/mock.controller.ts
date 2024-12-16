import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockDto } from './dto/mock.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mocks')
@ApiTags('Mocks')
@UseGuards(JwtAuthGuard)
export class MockController {
	constructor(private readonly mockService: MockService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new mock' })
	async create(@Body() mockDto: MockDto): Promise<IMock> {
		return await this.mockService.create(mockDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all mocks' })
	@ApiOkResponse({ isArray: true })
	async getAll(): Promise<IMock[]> {
		return await this.mockService.getAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get mock by id' })
	async getOne(@Param('id') id: string): Promise<IMock> {
		return this.mockService.getOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update mock by id' })
	async update(@Param('id') id: string, @Body() mockDto: MockDto): Promise<IMock> {
		return this.mockService.update(+id, mockDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete mock by id' })
	async delete(@Param('id') id: string): Promise<IMock> {
		return this.mockService.delete(+id);
	}
}
