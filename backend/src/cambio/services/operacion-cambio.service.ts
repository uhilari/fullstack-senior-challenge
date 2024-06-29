import { HttpException, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { OperacionCambio, TipoCambio } from '../models';
import { Model } from 'mongoose';
import { CreateOperacionCambioDto } from '../dtos';
import { OperacionCambioDocument, TipoCambioDocument } from '../schemas';
import * as moment from "moment";

@Injectable()
export class OperacionCambioService { 
    private readonly logger: Logger = new Logger(OperacionCambioService.name);

    constructor(
        @InjectModel(OperacionCambio.name) private readonly operacionCambio: Model<OperacionCambioDocument>,
        @InjectModel(TipoCambio.name) private readonly tcModel: Model<TipoCambioDocument>
    ) { }

    validateCreateOperacion(dto: CreateOperacionCambioDto) {
        if (dto.monedaOrigen == dto.monedaDestino)
            throw new HttpException("No puede ser la misma moneda", 400);
        if (dto.monedaDestino != "PEN" && dto.monedaDestino != "USD")
            throw new HttpException(`${dto.monedaDestino} no es una moneda válida`, 400);
        if (dto.monedaOrigen != "PEN" && dto.monedaOrigen != "USD")
            throw new HttpException(`${dto.monedaOrigen} no es una moneda válida`, 400);
    }

    async create(dto: CreateOperacionCambioDto) {
        this.validateCreateOperacion(dto);
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
            this.logger.log('operacion calculada', operacion);
            return await this.operacionCambio.create(operacion);
        }
        else {
            throw new HttpException("No existe un Tipo de Cambio registrado", 404);
        }
    }

    async lista(fechaInicio: Date, fechaFin: Date) {
        let lista = await this.operacionCambio.find({ 
                fecha: { 
                    $gte: moment(fechaInicio).toDate(), 
                    $lt: moment(fechaFin).add(1, 'day').toDate() 
                } 
            })
            .sort({ fecha: -1 });
        return lista;
    }
}