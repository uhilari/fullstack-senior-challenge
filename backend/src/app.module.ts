import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CambioModule } from './cambio/cambio.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:8717/cambio'),
    CambioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
