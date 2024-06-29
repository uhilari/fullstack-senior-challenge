import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpClient from '../utils/api' 

const defaultData = {
    monto: 0,
    monedaOrigen: 'PEN',
    monedaDestino: 'USD'
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
    reset() {
        this.monto = defaultData.monto;
        this.monedaDestino = defaultData.monedaDestino;
        this.monedaOrigen = defaultData.monedaOrigen;
    }
  }
})
