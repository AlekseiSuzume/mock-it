import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

const cors = require('cors');

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		rawBody: true
	});
	app.use(cors());
	await app.register(import('fastify-raw-body'), {
		field: 'rawBody', // change the default request.rawBody property name
		global: true, // add the rawBody to every request. **Default true**
		encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
		runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
		routes: [], // array of routes, **`global`** will be ignored, wildcard routes not supported
		jsonContentTypes: [] // array of content-types to handle as JSON. **Default ['application/json']**
	});

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
