import { OperacionCambio } from "src/cambio/models";
import { MockModel } from "./mock-model";
import { operacionCompra } from "../stubs/operacion-cambio.stub";

export class OperacionCambioMockModel extends MockModel<OperacionCambio> {
    protected entityStub: OperacionCambio = operacionCompra();
}