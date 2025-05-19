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
const { user, loggedIn } = storeToRefs(store);

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@patchbay.io",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Patchbay",
      logo: ProjectLogo,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  main: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" :active-team="data.teams[0]" />
    </SidebarHeader>
    <SidebarContent>
      <MainNav :items="data.main" />
      <ProjectsNav :projects="data.projects" />
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
