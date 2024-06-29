import { TipoCambio } from "../../models/tipo-cambio.model";

export const tipoCambioStub = (): TipoCambio => {
    return {
        compra: 3.812,
        venta: 3.817,
        origen: "SUNAT",
        moneda: "USD",
        fecha: new Date(2024, 5, 28)
    }
}