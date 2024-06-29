import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNumber, IsString, Min, NotEquals, ValidateIf } from 'class-validator';

export class CreateOperacionCambioDto {
    @IsString({ message: 'La moneda de origen es obligatorio' })
    monedaOrigen: string;

    @IsString({ message: 'La moneda de destino es obligatorio' })
    @ValidateIf((obj, val) => obj.monedaOrigen != val, { message: 'Las monedas deben ser diferentes' })
    monedaDestino: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0, { message: 'El monto debe ser mayor a 0' })
    @Type(() => Number)
    monto: number;
}


export class ListaOperacionCambioDto {
    @IsDate({ message: 'La fecha de inicio es necesaria' })
    @Type(() => Date)
    fechaInicio: Date;

    @IsDate({ message: 'La fecha de fin es necesaria' })
    @Type(() => Date)
    fechaFin: Date;
}