<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import PageHeader from "./components/PageHeader.vue";
</script>

<template>
  <PageHeader />
  <section class="relative isolate overflow-hidden bg-white px-2 py-4 sm:py-4 lg:px-2">
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <RouterView />
    </div>
  </section>
</template>
