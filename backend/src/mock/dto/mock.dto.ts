import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
	status_code: string;
	@IsString()
	@ApiProperty()
	body: string;
}
