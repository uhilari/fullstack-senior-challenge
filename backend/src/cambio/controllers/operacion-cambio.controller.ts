import { Body, Controller, Post } from "@nestjs/common";
import { CreateOperacionCambioDto } from "../dtos/operacion-cambio.request";
import { OperacionCambioService } from "../services/operacion-cambio.service";

@Controller("operacion-cambio")
export class OperacionCambioController {
    constructor(
        private readonly service: OperacionCambioService
    ) { }

    @Post("")
    async createOperacionCambio(@Body() dto: CreateOperacionCambioDto) {
        return await this.service.create(dto);
    }
}