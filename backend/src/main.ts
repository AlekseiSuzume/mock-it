import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

const cors = require('cors');

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	app.use(cors());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	const config = new DocumentBuilder()
		.setTitle('Mock-It-Easy API')
		.setDescription('This is the Mock-It-Easy API description')
		.setVersion('0.1')
		.addServer('http://localhost:20000')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, document);

	await app.listen(20000);
}

bootstrap();
