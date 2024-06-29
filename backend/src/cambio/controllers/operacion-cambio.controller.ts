import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateOperacionCambioDto, ListaOperacionCambioDto } from "../dtos";
import { OperacionCambioService } from "../services";

@Controller("operacion-cambio")
export class OperacionCambioController {
    constructor(
        private readonly service: OperacionCambioService
    ) { }

    @Post("")
    async createOperacionCambio(@Body() dto: CreateOperacionCambioDto) {
        return await this.service.create(dto);
    }

    @Get("")
    async listaOperaciones(@Query() dto: ListaOperacionCambioDto) {
        console.log(dto);
        return await this.service.lista(dto.fechaInicio, dto.fechaFin);
    }
}