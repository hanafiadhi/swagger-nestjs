import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nama API Anda')
    .setDescription('Deskripsi API Anda')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', swaggerApp, document);

  await app.listen(3000);
  await swaggerApp.listen(8080);

  // Buat server Express terpisah untuk Swagger UI
}
bootstrap();
