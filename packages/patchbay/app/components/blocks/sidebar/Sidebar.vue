<script setup lang="js">
import ProjectLogo from "~/assets/icons/project-logo.svg";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LogIn,
} from "lucide-vue-next";

import MainNav from "@/components/blocks/nav/MainNav.vue";
import ProjectsNav from "@/components/blocks/nav/ProjectsNav.vue";
import UserNav from "@/components/blocks/nav/UserNav.vue";
import TeamSwitcher from "@/components/blocks/nav/TeamSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const store = usePatchbayStore();
const { user, loggedIn, project } = storeToRefs(store);
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            v-if="project"
            size="lg"
            class="data-[state=open]:bg-sidebar-primary data-[state=open]:text-sidebar-primary-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              <img :src="project.logo" :alt="project.name" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ project.name }}</span>
              <span class="truncate text-xs">{{ project.description }}</span>
            </div>
            <!-- <ChevronsUpDown class="ml-auto" /> -->
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent class="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem
              class="flex items-center gap-2"
              v-if="!user && !loggedIn"
            >
              <SidebarMenuButton :tooltip="$t('sidebar.login')">
                <LogIn />
                <NuxtLink to="/patchbay/admin/login" external>
                  {{ $t("sidebar.login") }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- <MainNav :items="data.main" /> -->
      <!-- <ProjectsNav :projects="data.projects" /> -->
    </SidebarContent>
    <SidebarFooter>
      <UserNav
        :user="{
          name: user.first_name,
          email: user.email,
          avatar:
            (user.avatar && `/patchbay/assets/${user.avatar}`) || undefined,
          id: user.id,
        }"
        v-if="user && loggedIn"
      />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
