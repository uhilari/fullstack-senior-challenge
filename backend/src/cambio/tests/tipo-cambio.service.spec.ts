import { Test } from "@nestjs/testing";
import { CambioSunatService, TipoCambioService } from "../services";
import { getModelToken } from "@nestjs/mongoose";
import { TipoCambio } from "../models";
import { TipoCambioMockModel } from "./mocks";
import { tipoCambioStub } from "./stubs/tipo-cambio.stub";

jest.mock('../services/cambio-sunat.service.ts');

describe('TipoCambioService', () => {
    let service: TipoCambioService;
    let cambioService: CambioSunatService;
    let mockTcModel;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TipoCambioService,
                CambioSunatService,
                {
                    provide: getModelToken(TipoCambio.name),
                    useClass: TipoCambioMockModel
                }
            ]
        }).compile();
        service = moduleRef.get<TipoCambioService>(TipoCambioService);
        cambioService = moduleRef.get<CambioSunatService>(CambioSunatService);
        mockTcModel = moduleRef.get(getModelToken(TipoCambio.name));
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('METHOD getTC', () => {
        it('Debe llamar a TC de sunat', async() => {
            jest.spyOn(cambioService, 'getTC').mockResolvedValue(tipoCambioStub());
            await service.grabarTipoCambio();
            expect(cambioService.getTC).toHaveBeenCalled();
        });

        it('Debe llamar a update', async() => {
            jest.spyOn(cambioService, 'getTC').mockResolvedValue(tipoCambioStub());
            jest.spyOn(mockTcModel, 'updateOne');
            jest.spyOn(mockTcModel, 'create');
            await service.grabarTipoCambio();
            expect(mockTcModel.updateOne).toHaveBeenCalledTimes(1);
            expect(mockTcModel.create).toHaveBeenCalledTimes(0);
        });

        it('Debe llamar a create', async() => {
            jest.spyOn(cambioService, 'getTC').mockResolvedValue(tipoCambioStub());
            jest.spyOn(mockTcModel, 'findOne').mockResolvedValue(undefined);
            jest.spyOn(mockTcModel, 'updateOne');
            jest.spyOn(mockTcModel, 'create');
            await service.grabarTipoCambio();
            expect(mockTcModel.updateOne).toHaveBeenCalledTimes(0);
            expect(mockTcModel.create).toHaveBeenCalledTimes(1);
        });
    });
});