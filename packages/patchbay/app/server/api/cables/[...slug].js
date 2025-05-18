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
new FilesUtil(utilProvider);
new HelperUtil(utilProvider);
new LibsUtil(utilProvider);
new OpsUtil(utilProvider);
new ProjectsUtil(utilProvider);
new SubPatchOpUtil(utilProvider);

const patchbayApi = new PatchbayApi(utilProvider, eventEmitter, patchbayApp);
const patchbayEndpoint = new PatchbayEndpoint(utilProvider, patchbayApp);

patchbayApi.init();

export default defineEventHandler(async (event) => {
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
    const query = await getQuery(event);
    let result = null;
    eventEmitter.once(slug, (event) => {
      result = event.returnValue;
    });
    eventEmitter.emit(slug, {}, query);
    return result;
  } else if (slug.startsWith("talkerMessage")) {
    const body = await readBody(event);
    const slugElements = slug.split("/");
    let result = null;
    eventEmitter.once(slugElements[0], (event) => {
      result = event.returnValue;
    });
    eventEmitter.emit(
      slugElements[0],
      {},
      slugElements[1],
      body,
      body.topicConfig,
    );
    return await result;
  } else {
    return patchbayEndpoint.handle(event.node.req);
  }
});
