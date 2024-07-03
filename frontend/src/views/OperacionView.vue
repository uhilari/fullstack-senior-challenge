<script setup lang="ts">
import { useOperacionStore } from "../stores/operacion"

const store = useOperacionStore();

const validarMonto = () => {
    let result = {
        valido: true,
        msg: ''
    };
    let monto = parseFloat(store.monto as any);
    if (isNaN(monto) || monto <= 0) {
        result.msg = "El monto no es válido";
        result.valido = false;
    }
    else {
        let strs = monto.toFixed(2).split('.');
        if (strs.length > 7) {
            result.msg = "El monto no es válido";
            result.valido = false;
        }
        else {
            store.monto = parseFloat(monto.toFixed(2));
        }
    }
    return result;
}

const validarMonedaOrigen = () => {
    let result = {
        valido: true,
        msg: ''
    };
    return result;
}

const validarMonedaDestino = () => {
    let result = {
        valido: true,
        msg: ''
    };
    if (store.monedaDestino == store.monedaOrigen) {
        result.msg = "La moneda de destino no puede ser igual a la moneda de origen";
        result.valido = false;
    }
    return result;
}

const validar = () => {
    let err = {
        monto: validarMonto(),
        monedaOrigen: validarMonedaOrigen(),
        monedaDestino: validarMonedaDestino()
    };
    store.setError(err);
    return err.monto.valido && err.monedaOrigen.valido && err.monedaDestino.valido;
}

const grabar = () => {
    if (validar()) {
        store.grabar();
    }
}
</script>

<template>
  <form @submit.prevent="grabar">
    <div class="space-y-12 w-1/3">
      <div class="border-b border-gray-900/10 pb-4">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Nueva Operacion</h2>
      </div>

      <div class="sm:col-span-3">
        <label for="monto" class="block text-sm font-medium leading-6 text-gray-900">Monto a Cambiar</label>
        <div class="mt-2">
          <input type="text" v-model="store.monto" name="monto" id="monto" :class="{ 'ring-red-500': !store.errores.monto.valido }" 
            class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            @blur="validar" />
          <p v-if="!store.errores.monto.valido" class="text-red-500 text-xs">{{ store.errores.monto.msg }}</p>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="monedaOrigen" class="block text-sm font-medium leading-6 text-gray-900">Moneda a Enviar</label>
        <div class="mt-2">
          <select id="monedaOrigen" v-model="store.monedaOrigen" name="monedaOrigen"  :class="{ 'ring-red-500': !store.errores.monedaOrigen.valido }" 
            class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            @blur="validar" >
            <option>PEN</option>
            <option>USD</option>
          </select>
          <p v-if="!store.errores.monedaOrigen.valido" class="text-red-500 text-xs">{{ store.errores.monedaOrigen.msg }}</p>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="monedaDestino" class="block text-sm font-medium leading-6 text-gray-900">Moneda a Recibir</label>
        <div class="mt-2">
          <select id="monedaDestino" v-model="store.monedaDestino" name="monedaDestino"  :class="{ 'ring-red-500': !store.errores.monedaDestino.valido }" 
            class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            @blur="validar" >
            <option>PEN</option>
            <option>USD</option>
          </select>
          <p v-if="!store.errores.monedaDestino.valido" class="text-red-500 text-xs">{{ store.errores.monedaDestino.msg }}</p>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </div>
  </form>
</template>