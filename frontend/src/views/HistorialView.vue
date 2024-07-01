<script setup lang="ts">
import { onMounted } from "vue";
import { useOperacionesStore } from '../stores/operaciones';

const store = useOperacionesStore();

onMounted(() => {
    store.cargar();
});

const filtrarOperaciones = () => {
    store.cargar();
}
</script>

<template>
  <div class="space-y-4 w-full">
    <div class="border-b border-gray-900/10 pb-4">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Historial de Operaciones</h2>
    </div>

    <div class="border-b border-gray-900/10 pb-4">
      <form @submit.prevent="filtrarOperaciones">
        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label for="fechaInicio" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Inicio</label>
            <div class="mt-2">
              <input type="date" v-model="store.fechaInicio" name="fechaInicio" id="fechaInicio" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="fechaFin" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Termino</label>
            <div class="mt-2">
              <input type="date" v-model="store.fechaFin" name="fechaFin" id="fechaFin" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-1">
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Filtrar</button>
          </div>
        </div>
      </form>
    </div>
    
    <div class="border-b border-gray-900/10 pb-4">
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="op of store.operaciones" class="flex justify-between gap-x-6 py-2">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p v-if="op.monedaOrigen == 'PEN'" class="text-sm font-semibold leading-6 text-gray-900">Compra</p>
              <p v-if="op.monedaOrigen == 'USD'" class="text-sm font-semibold leading-6 text-gray-900">Venta</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">TC {{ op.tipoCambio }}</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{{ op.monto.toFixed(2) }} {{ op.monedaOrigen }}</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">{{ op.montoCambiado.toFixed(2) }} {{ op.monedaDestino }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>