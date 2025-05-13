import { utilProvider } from "@cables/api";
import { PatchbaySettings, PatchbayApp, PatchbayApi } from "@patchbay/server";
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

const patchbaySettings = new PatchbaySettings(tmpdir(), appConfig);
const patchbayApp = new PatchbayApp(
  utilProvider,
  __dirname,
  appConfig.getPath("userData"),
  configLocation,
  patchbaySettings,
);
const patchbayApi = new PatchbayApi(eventEmitter, patchbayApp);

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
  } else {
    throw createError({
      statusCode: 404,
    });
  }
});
