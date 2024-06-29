import { OperacionCambio } from "../../models/operacion-cambio.model";

export const operacionCompra = (): OperacionCambio => ({
    monedaDestino: "PEN",
    monedaOrigen: "USD",
    monto: 381.2,
    montoCambiado: 100,
    tipoCambio: 3.812,
    fecha: new Date()
});

export const operacionVenta = (): OperacionCambio => ({
    monedaDestino: "USD",
    monedaOrigen: "PEN",
    monto: 100,
    montoCambiado: 381.7,
    tipoCambio: 3.817,
    fecha: new Date()
});