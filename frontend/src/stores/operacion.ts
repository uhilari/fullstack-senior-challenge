import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpClient from '../utils/api' 

export interface ErrorMsg {
    valido: boolean;
    msg: string
}

export interface OperacionError {
    monto: ErrorMsg;
    monedaOrigen: ErrorMsg;
    monedaDestino: ErrorMsg;
}

const defaultData = {
    monto: 0,
    monedaOrigen: 'PEN',
    monedaDestino: 'USD',
    errores: {
        monto: { valido: true, msg: '' },
        monedaOrigen: { valido: true, msg: '' },
        monedaDestino: { valido: true, msg: '' }
    }
  }

export const useOperacionStore = defineStore('operacion', {
  state: () => ({ ...defaultData }),
  actions: {
    async grabar() {
      const opData = {
        monto: this.monto,
        monedaOrigen: this.monedaOrigen,
        monedaDestino: this.monedaDestino
      };
      try {
        const { data } = await httpClient.post('/operacion-cambio', opData);
        console.log(data);
        this.reset();
      }
      catch (error) {
        console.log(error);
      }
    },
    setMonto(val: number) {
        this.monto = val;
    },
    setError(err: OperacionError) {
        this.errores = err;
    },
    reset() {
        this.monto = defaultData.monto;
        this.monedaDestino = defaultData.monedaDestino;
        this.monedaOrigen = defaultData.monedaOrigen;
    }
  }
})
