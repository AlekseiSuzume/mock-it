import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { MatcherType } from '@prisma/client';

export class MockDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	url: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	method: string;
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	body_patterns: string;
	@IsEnum(MatcherType)
	@IsOptional()
	@ApiPropertyOptional({ enum: MatcherType })
	matcher_type: MatcherType;
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	headers: string;
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	status_code: number;
	@IsString()
	@IsOptional()
	@ApiProperty()
	body: string;
	@IsNotEmpty()
	@IsOptional()
	@IsNumber()
	created_by_id: number;
}
