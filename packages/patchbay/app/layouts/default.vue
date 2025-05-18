<script setup lang="ts">
import Footer from "@/components/blocks/footer/Footer.vue";
</script>

<template>
  <div class="h-screen bg-gradient px-4">
    <slot></slot>
    <Footer></Footer>
  </div>
</template>
