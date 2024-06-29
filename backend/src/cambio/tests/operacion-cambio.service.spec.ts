import { Test } from "@nestjs/testing";
import { OperacionCambioService } from "../services/operacion-cambio.service";
import * as moment from "moment";
import { CreateOperacionCambioDto } from "../dtos";
import { OperacionCambio, TipoCambio } from "../models";
import { getModelToken } from "@nestjs/mongoose";
import { OperacionCambioMockModel, TipoCambioMockModel } from "./mocks";
import { HttpException } from "@nestjs/common";

describe('OperacionCambioService', () => {
    let operacionCambioSvc: OperacionCambioService;
    let mockOpCambioModel;
    let mockTcModel;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                OperacionCambioService,
                {
                    provide: getModelToken(OperacionCambio.name),
                    useClass: OperacionCambioMockModel
                },
                {
                    provide: getModelToken(TipoCambio.name),
                    useClass: TipoCambioMockModel
                }
            ]
        }).compile();
        operacionCambioSvc = moduleRef.get(OperacionCambioService);
        mockOpCambioModel = moduleRef.get(getModelToken(OperacionCambio.name));
        mockTcModel = moduleRef.get(getModelToken(TipoCambio.name));
    });

    it('should be defined', () => {
        expect(operacionCambioSvc).toBeDefined();
    });

    describe('METHOD create', () => {
        let now;

        beforeEach(() => {
            now = moment().format("YYYY-MM-DD");
        });

        it('Success Venta', async () => {
            const entrada: CreateOperacionCambioDto = {
                monedaDestino: "PEN",
                monedaOrigen: "USD",
                monto: 100
            };
            let result = await operacionCambioSvc.create(entrada);
            expect(result).toBeDefined();
            expect(result.monedaDestino).toEqual("PEN");
            expect(result.monedaOrigen).toEqual("USD");
            expect(result.monto).toEqual(100);
            expect(result.tipoCambio).toEqual(3.812);
            expect(result.montoCambiado).toEqual(381.20);
        });

        it('Success Compra', async () => {
            const entrada: CreateOperacionCambioDto = {
                monedaDestino: "USD",
                monedaOrigen: "PEN",
                monto: 381.7
            };
            let result = await operacionCambioSvc.create(entrada);
            expect(result).toBeDefined();
            expect(result.monedaDestino).toEqual("USD");
            expect(result.monedaOrigen).toEqual("PEN");
            expect(result.monto).toEqual(381.7);
            expect(result.tipoCambio).toEqual(3.817);
            expect(result.montoCambiado).toEqual(100);
        });

        it('Misma moneda', async() => {
            const entrada: CreateOperacionCambioDto = {
                monedaDestino: "PEN",
                monedaOrigen: "PEN",
                monto: 381.7
            };
            await expect(operacionCambioSvc.create(entrada))
                .rejects.toBeInstanceOf(HttpException);
        });

        it('Moneda destino diferente de PEN o USD', async () => {
            const entrada: CreateOperacionCambioDto = {
                monedaDestino: "CAD",
                monedaOrigen: "USD",
                monto: 381.7
            };
            await expect(operacionCambioSvc.create(entrada))
                .rejects.toBeInstanceOf(HttpException);
        });

        it('Moneda origen diferente de PEN o USD', async () => {
            const entrada: CreateOperacionCambioDto = {
                monedaDestino: "PEN",
                monedaOrigen: "MXN",
                monto: 381.7
            };
            await expect(operacionCambioSvc.create(entrada))
                .rejects.toBeInstanceOf(HttpException);
        });
    });
});