import { tipoCambioStub } from "../tests/stubs/tipo-cambio.stub";

export const CambioSunatService = jest.fn().mockReturnValue({
    getTC: jest.fn()
})