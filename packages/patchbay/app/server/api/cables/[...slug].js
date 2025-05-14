import { UtilProvider } from "@cables/api";
import {
  PatchbaySettings,
  PatchbayApp,
  PatchbayApi,
  PatchbayEndpoint,
  DocUtil,
  FilesUtil,
  HelperUtil,
  LibsUtil,
  Logger,
  OpsUtil,
  ProjectsUtil,
  SubPatchOpUtil,
} from "@patchbay/server";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { EventEmitter } from "node:events";

const metaUrl = new URL(".", import.meta.url);
const __dirname = fileURLToPath(metaUrl.href);

const configLocation = useRuntimeConfig().cables.configLocation;
if (!existsSync(configLocation)) {
  console.error(
    "custom config set to ",
    configLocation,
    "but file does not exists, do you need to run `npm run build`?",
  );
  process.exit(1);
}

const appConfig = {
  getPath: (path) => path,
};

const eventEmitter = new EventEmitter();
const utilProvider = new UtilProvider();

new Logger(utilProvider);

const patchbaySettings = new PatchbaySettings(
  utilProvider,
  tmpdir(),
  appConfig,
);
const patchbayApp = new PatchbayApp(
  utilProvider,
  __dirname,
  appConfig.getPath("userData"),
  configLocation,
  patchbaySettings,
);

new DocUtil(utilProvider);
new FilesUtil(utilProvider, patchbayApp);
new HelperUtil(utilProvider, patchbayApp);
new LibsUtil(utilProvider);
new OpsUtil(utilProvider, patchbayApp);
new ProjectsUtil(utilProvider, patchbayApp);
new SubPatchOpUtil(utilProvider);

const patchbayApi = new PatchbayApi(utilProvider, eventEmitter, patchbayApp);
const patchbayEndpoint = new PatchbayEndpoint(utilProvider, patchbayApp);

patchbayApi.init();

export default defineEventHandler((event) => {
  const slug = event.context.params.slug;
  if (
    [
      "platformSettings",
      "cablesConfig",
      "getStartupLog",
      "getOpModuleDir",
      "getOpModuleLocation",
    ].includes(slug)
  ) {
    let result = null;
    eventEmitter.once(slug, (event) => {
      result = event.returnValue;
    });
    eventEmitter.emit(slug, {});
    return result;
  } else if (slug.startsWith("ops")) {
    return patchbayEndpoint.handle(event.node.req);
  } else {
    throw createError({
      statusCode: 404,
    });
  }
});
