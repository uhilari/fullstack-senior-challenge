import mongoose, { Document } from "mongoose";
import { TipoCambio } from "../models";

export type TipoCambioDocument = TipoCambio & Document;

export const TipoCambioSchema = new mongoose.Schema({
    compra: Number,
    venta: Number,
    origen: String,
    moneda: String,
    fecha: Date
})