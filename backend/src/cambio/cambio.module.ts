import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperacionCambio, TipoCambio } from './models';
import { OperacionCambioSchema, TipoCambioSchema } from './schemas';
import { OperacionCambioController } from './controllers';
import { CambioSunatService, OperacionCambioService, TipoCambioService } from './services';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            { name: OperacionCambio.name, schema: OperacionCambioSchema },
            { name: TipoCambio.name, schema: TipoCambioSchema }
        ]),
        HttpModule
    ],
    controllers: [
        OperacionCambioController
    ],
    providers: [
        CambioSunatService,
        OperacionCambioService,
        TipoCambioService
    ],
    exports: [ TipoCambioService ]
})
export class CambioModule {}
