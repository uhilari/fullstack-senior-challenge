import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { OperacionCambio } from '../models/operacion-cambio.model';
import { Model } from 'mongoose';
import { OperacionCambioDocument } from '../schemas/operacion-cambio.schema';
import { CreateOperacionCambioDto } from '../dtos/operacion-cambio.request';

@Injectable()
export class OperacionCambioService { 
    constructor(
        @InjectModel(OperacionCambio.name) private readonly operacionCambio: Model<OperacionCambioDocument>
    ) { }

    async create(dto: CreateOperacionCambioDto) {
        return await this.operacionCambio.create({
            monedaOrigen: dto.monedaOrigen,
            monedaDestino: dto.monedaDestino,
            monto: dto.monto,
            tipoCambio: 3,
            montoCambiado: dto.monto * 3,
            fecha: new Date()
        });
    }
}