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
import path from "node:path";

const metaUrl = new URL(".", import.meta.url);
const __dirname = fileURLToPath(metaUrl.href);

const config = useRuntimeConfig().cables;

const configLocation = config.configLocation;
if (!existsSync(configLocation)) {
  console.error(
    "custom config set to ",
    configLocation,
    "but file does not exists, do you need to run `npm run build`?",
  );
  process.exit(1);
}

const EXAMPLE_PATH = config.examplePath;

const appConfig = {
  getPath: (p) => path.join("/examples/jungle-jungle", p),
  patchId: "jungle-jungle",
  patchFile: path.join(EXAMPLE_PATH, "jungle-jungle.cables"),
  currentPatchDir: "/examples/jungle-jungle",
};

const eventEmitter = new EventEmitter();
const utilProvider = new UtilProvider();

new Logger(utilProvider);
new HelperUtil(utilProvider);
new ProjectsUtil(utilProvider);

const patchbaySettings = new PatchbaySettings(
  utilProvider,
  EXAMPLE_PATH,
  appConfig,
);
const patchbayApp = new PatchbayApp(
  utilProvider,
  __dirname,
  tmpdir(),
  configLocation,
  patchbaySettings,
);

new DocUtil(utilProvider);
new FilesUtil(utilProvider);
new LibsUtil(utilProvider);
new OpsUtil(utilProvider);
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
      body.data,
      body.topicConfig,
    );
    return await result;
  } else {
    return patchbayEndpoint.handle(event.node.req);
  }
});
