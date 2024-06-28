import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOperacionCambioDto {
    @IsString({ message: 'La moneda de origen es obligatorio' })
    monedaOrigen: string;

    @IsString({ message: 'La moneda de destino es obligatorio' })
    monedaDestino: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0, { message: 'El monto debe ser mayor a 0' })
    @Type(() => Number)
    monto: number;
}