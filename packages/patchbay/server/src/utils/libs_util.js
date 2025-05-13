import { utilProvider, SharedLibsUtil } from "@cables/api";

class LibsUtil extends SharedLibsUtil {}

export default () => new LibsUtil(utilProvider);
