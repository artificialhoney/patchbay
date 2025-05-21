<script setup lang="ts">
import Footer from "@/components/blocks/footer/Footer.vue";
import { usePatchbayStore } from "@/stores/patchbay";
import { storeToRefs } from "pinia";
const store = usePatchbayStore();
const { ready } = storeToRefs(store);
</script>

<template>
  <div class="h-screen bg-gradient px-4" v-if="ready">
    <slot></slot>
    <Footer></Footer>
  </div>
</template>
