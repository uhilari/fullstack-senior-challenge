import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CambioModule } from './cambio/cambio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.BD_URL),
    ScheduleModule.forRoot(),
    CambioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
