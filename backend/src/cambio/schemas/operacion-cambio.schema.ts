import mongoose, { Document } from "mongoose";
import { OperacionCambio } from "../models/operacion-cambio.model";

export type OperacionCambioDocument = OperacionCambio & Document;

export const OperacionCambioSchema = new mongoose.Schema({
    monedaOrigen: String,
    monedaDestino: String,
    monto: Number,
    montoCambiado: Number,
    tipoCambio: Number,
    fecha: Date
})