import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockDto } from './dto/mock.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Mock } from '@prisma/client';

@Controller('mocks')
@ApiTags('Mocks')
export class MockController {
	constructor(private readonly mockService: MockService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new mock' })
	async create(@Body() mockDto: MockDto): Promise<Mock> {
		return await this.mockService.create(mockDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all mocks' })
	@ApiOkResponse({ isArray: true })
	async getAll(): Promise<Mock[]> {
		return await this.mockService.getAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get mock by id' })
	async getOne(@Param('id') id: string) {
		return this.mockService.getOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update mock by id' })
	async update(@Param('id') id: string, @Body() mockDto: MockDto) {
		return this.mockService.update(+id, mockDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete mock by id' })
	async delete(@Param('id') id: string) {
		return this.mockService.delete(+id);
	}
}
