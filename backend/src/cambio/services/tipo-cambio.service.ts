import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CambioSunatService } from "./cambio-sunat.service";
import { InjectModel } from "@nestjs/mongoose";
import { TipoCambio } from "../models";
import { TipoCambioDocument } from "../schemas";
import { Model } from "mongoose";

@Injectable()
export class TipoCambioService {
    private readonly logger = new Logger(TipoCambioService.name);

    constructor(
        private readonly cambioSunat: CambioSunatService,
        @InjectModel(TipoCambio.name) private readonly tcModel: Model<TipoCambioDocument>
    ) { }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async grabarTipoCambio() {
        this.logger.log("Llamanto a SUNAT");
        let tc = await this.cambioSunat.getTC();
        this.logger.log(`TC obtenido`);
        this.logger.log(tc);
        let ultimoTC = await this.tcModel.findOne({ fecha: tc.fecha });
        if (ultimoTC) {
            this.logger.log(`actualizando '${ultimoTC.id}'`);
            await this.tcModel.updateOne({ id: ultimoTC.id }, { compra: tc.compra, venta: tc.venta });
        }
        else {
            this.logger.log('creando nuevo tc');
            await this.tcModel.create({
                compra: tc.compra,
                venta: tc.venta,
                origen: tc.origen,
                moneda: tc.moneda,
                fecha: tc.fecha
            });
        }
    }
}