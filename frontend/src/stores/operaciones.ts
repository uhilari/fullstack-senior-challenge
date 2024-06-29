import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpClient from '../utils/api' 

export const useOperacionesStore = defineStore('operaciones', {
  state: () => ({
    operaciones: [],
    fechaInicio: moment().format('yyyy-MM-DD'),
    fechaFin: moment().format('yyyy-MM-DD')
  }),
  actions: {
    async cargar() {
      try {
        const { data } = await httpClient.get(`/operacion-cambio?fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`);
        this.operaciones = data;
      }
      catch (error) {
        console.log(error);
        this.operaciones = [];
      }    
    }
  }
})
