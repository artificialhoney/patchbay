<script setup lang="js">
import { GithubIcon, MailIcon } from "lucide-vue-next";
import ProjectLogo from "~/assets/icons/project-logo.svg";
import XIcon from "~/assets/icons/x.svg";

import { Separator } from "@/components/ui/separator";

const { links } = defineProps({
  links: {
    type: Array,
    required: false,
    default: [
      {
        title: "honeymachine.io",
        href: "https://honeymachine.io",
      },
      {
        title: "cables.gl",
        href: "https://cables.gl",
      },
      {
        title: "undev.studio",
        href: "https://undev.studio",
      },
    ],
  },
});
</script>

<template>
  <footer>
    <div class="max-w-screen-xl mx-auto">
      <div class="py-12 flex flex-col justify-start items-center">
        <ProjectLogo />
        <ul class="mt-6 flex items-center gap-4 flex-wrap">
          <li :key="link.href" v-for="link in links">
            <NuxtLink
              :to="link.href"
              target="_blank"
              class="text-muted-foreground hover:text-foreground font-medium"
              external
            >
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <Separator />
      <div
        class="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0"
      >
        <span class="text-muted-foreground">
          &copy; {{ new Date().getFullYear() + " " }}
          <NuxtLink to="/" target="_blank"> Patchbay </NuxtLink> . All rights
          reserved.
        </span>
        <div class="flex items-center gap-5 text-muted-foreground">
          <NuxtLink to="https://x.com/bordeaux1981" target="_blank" external>
            <XIcon class="h-5 w-5" />
          </NuxtLink>
          <NuxtLink to="mailto:hi@honeymachine.io" target="_blank" external>
            <MailIcon class="h-5 w-5" />
          </NuxtLink>
          <NuxtLink
            to="https://github.com/artificialhoney/patchbay"
            target="_blank"
            external
          >
            <GithubIcon class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
