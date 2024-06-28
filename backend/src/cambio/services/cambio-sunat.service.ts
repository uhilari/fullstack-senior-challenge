import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TipoCambioSunatDto } from "../dtos";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class CambioSunatService {
    constructor(
        private readonly config: ConfigService,
        private readonly httpService: HttpService
    ) { }

    async getTC(): Promise<TipoCambioSunatDto> {
        let url = this.config.get<string>("TC_SUNAT");
        return await firstValueFrom<TipoCambioSunatDto>(this.httpService.get<TipoCambioSunatDto>(url).pipe(map(r => r.data)));
    }
}