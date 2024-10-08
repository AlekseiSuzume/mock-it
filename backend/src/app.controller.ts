import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('/*')
	handleAllRequests(@Req() request: Request): any {
		console.log(request.url);
		if (request.url === '/m1') {
			return {
				m1: 1
			};
		}
		if (request.url === '/m2') {
			return {
				m2: 'm2'
			};
		}
		return 'mock';
	}
}
