import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('REST Service example')
    .setDescription('The REST Service API description')
    .setVersion('1.0')
    .addTag('rest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`
  🚀 Server running on http://localhost:${PORT}
  👌 Swagger: http://localhost:${PORT}/api`);
}
bootstrap();
