<script setup lang="ts">
import { useOperacionStore } from "../stores/operacion.ts"

const store = useOperacionStore();

const grabar = () => {
    store.grabar();
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
              <input type="text" v-model="store.monto" name="monto" id="monto" class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="monedaOrigen" class="block text-sm font-medium leading-6 text-gray-900">Moneda a Enviar</label>
        <div class="mt-2">
          <select id="monedaOrigen" v-model="store.monedaOrigen" name="monedaOrigen" class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            <option>PEN</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="monedaDestino" class="block text-sm font-medium leading-6 text-gray-900">Moneda a Recibir</label>
        <div class="mt-2">
          <select id="monedaDestino" v-model="store.monedaDestino" name="monedaDestino" class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            <option>PEN</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </div>
  </form>
</template>