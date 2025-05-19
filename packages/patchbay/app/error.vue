<script setup lang="js">
import { Button } from "@/components/ui/button";

const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[100dvh] p-4">
    <div class="max-w-xl w-full text-center flex-col">
      <div class="space-y-6">
        <img
          width="500"
          height="500"
          alt="Favicon"
          class="max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto"
          src="/icon/favicon.png"
        />
        <h1 class="text-4xl font-bold">{{ $t("error.title") }}</h1>
        <p class="text-gray-400">
          {{ $t("error.description") }}
        </p>
        <Button @click="handleError" variant="outline" class="cursor-pointer">
          {{ $t("error.goto") }}
        </Button>
      </div>
    </div>
  </div>
</template>
