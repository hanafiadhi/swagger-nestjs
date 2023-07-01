import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nama Aplikasi Anda')
    .setDescription('Deskripsi Aplikasi Anda')
    .setVersion('1.0')
    .setTermsOfService('https://example.com/terms')
    .setContact('John Doe', 'john@example.com', 'https://example.com/contact')
    .setLicense('MIT', 'https://example.com/license')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' })
    .addBasicAuth({ type: 'http', scheme: 'basic' })
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: { authorizationUrl: 'https://example.com/auth', scopes: {} },
      },
    })
    .addTag('Endpoints', 'Kumpulan endpoint aplikasi')
    .addServer('https://api.example.com', 'Production Server')
    .addServer('http://localhost:3000', 'Local Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    explorer: true, // Menampilkan fitur eksplorasi di Swagger UI
    swaggerOptions: {
      docExpansion: 'none', // Mengatur ekspansi dokumen Swagger
      filter: true, // Menampilkan fitur penyaringan di Swagger UI
      showRequestDuration: true, // Menampilkan durasi permintaan di Swagger UI
      //   urls: [
      //     {
      //       url: 'http://petstore.swagger.io/v2/swagger.json',
      //       name: 'Spec1',
      //     },
      //     {
      //       url: 'http://petstore.swagger.io/v2/swagger.json',
      //       name: 'Spec2',
      //     },
      //   ],
    },
  });

  await app.listen(3000);
  await swaggerApp.listen(8080);

  // Buat server Express terpisah untuk Swagger UI
}
bootstrap();
