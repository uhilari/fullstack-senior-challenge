import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperacionCambio } from './models/operacion-cambio.model';
import { OperacionCambioSchema } from './schemas/operacion-cambio.schema';
import { OperacionCambioController } from './controllers/operacion-cambio.controller';
import { OperacionCambioService } from './services/operacion-cambio.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: OperacionCambio.name, schema: OperacionCambioSchema }
    ])],
    controllers: [
        OperacionCambioController
    ],
    providers: [
        OperacionCambioService
    ]
})
export class CambioModule {}
