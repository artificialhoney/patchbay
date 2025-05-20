<script setup lang="js">
import Sidebar from "@/components/blocks/sidebar/Sidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePatchbayStore } from "@/stores/patchbay";

const { t } = useI18n({ useScope: "global" });
const store = usePatchbayStore();
const route = useRoute();

const title = t("patchbay.title");
const description = t("patchbay.description");

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: "/icon/favicon.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <SidebarProvider>
    <Sidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                {{ $t(`patch.${route.params.id ? "edit" : "new"}`) }}
              </BreadcrumbItem>
              <BreadcrumbSeparator
                class="hidden md:block"
                v-if="route.params.id"
              />
              <BreadcrumbItem v-if="route.params.id">
                <BreadcrumbPage>{{ route.params.id }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <slot></slot>>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
