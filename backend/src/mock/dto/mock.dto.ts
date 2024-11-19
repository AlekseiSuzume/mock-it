import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class MockDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	endpoint: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	method: string;
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	bodyPatterns: string;
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	headers: string;
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	status_code: number;
	@IsString()
	@ApiProperty()
	body: string;
	@IsNotEmpty()
	@IsNumber()
	created_by_id: number;
}
