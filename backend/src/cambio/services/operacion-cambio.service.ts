import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { OperacionCambio, TipoCambio } from '../models';
import { Model } from 'mongoose';
import { CreateOperacionCambioDto } from '../dtos';
import { OperacionCambioDocument, TipoCambioDocument } from '../schemas';
import * as moment from "moment";

@Injectable()
export class OperacionCambioService { 
    constructor(
        @InjectModel(OperacionCambio.name) private readonly operacionCambio: Model<OperacionCambioDocument>,
        @InjectModel(TipoCambio.name) private readonly tcModel: Model<TipoCambioDocument>
    ) { }

    async create(dto: CreateOperacionCambioDto) {
        const now = moment();
        const tc = await this.tcModel.findOne({ fecha: now.format('YYYY-MM-DD')});
        if (tc) {
            const operacion: OperacionCambio = {
                monedaDestino: dto.monedaDestino,
                monedaOrigen: dto.monedaOrigen,
                monto: dto.monto,
                montoCambiado: 0,
                tipoCambio: 0,
                fecha: new Date()
            };
            if (tc.moneda == dto.monedaOrigen) {
                operacion.tipoCambio = tc.compra;
                operacion.montoCambiado = Math.round((dto.monto * tc.compra) * 100) / 100;
            }
            else {
                operacion.tipoCambio = tc.venta;
                operacion.montoCambiado = Math.round((dto.monto / tc.venta) * 100) / 100;
            }
            return await this.operacionCambio.create(operacion);
        }
        else {
            throw new HttpException("No existe un Tipo de Cambio registrado", 404);
        }
    }
}