<script setup lang="js">
import ProjectLogo from "~/assets/icons/project-logo.svg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const { badge, heading, description, buttons } = defineProps({
  logo: {
    type: Boolean,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttons: {
    primary: {
      text: String,
      url: String,
    },
    secondary: {
      text: String,
      url: String,
    },
  },
});
</script>

<template>
  <section class="py-4 md:py-32">
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div
          class="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <ProjectLogo v-if="logo" class="text-7xl text-primary"></ProjectLogo>
          <h1 class="my-6 text-4xl font-bold text-pretty lg:text-6xl">
            {{ heading }}
          </h1>
          <p class="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {{ description }}
          </p>
          <div
            class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
          >
            <Button v-if="buttons?.primary" asChild class="w-full sm:w-auto">
              <NuxtLink :to="buttons.primary.url">{{
                buttons.primary.text
              }}</NuxtLink>
            </Button>
            <Button
              v-if="buttons?.secondary"
              variant="outline"
              class="w-full sm:w-auto"
            >
              <NuxtLink target="_blank" :to="buttons.secondary.url" external>
                {{ buttons.secondary.text }}
              </NuxtLink>
            </Button>
          </div>
        </div>
        <iframe
          src="https://cables.gl/view/11bVir"
          class="max-h-96 w-full rounded-md object-cover aspect-video"
        ></iframe>
      </div>
    </div>
  </section>
</template>
