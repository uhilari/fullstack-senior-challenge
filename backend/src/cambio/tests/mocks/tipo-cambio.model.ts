import { TipoCambio } from "src/cambio/models";
import { MockModel } from "./mock-model";
import { tipoCambioStub } from "../stubs/tipo-cambio.stub";

export class TipoCambioMockModel extends MockModel<TipoCambio> {
    protected entityStub: TipoCambio = tipoCambioStub();
}