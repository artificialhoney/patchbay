import { utilProvider, SharedSubPatchOpUtil } from "@cables/api";

class SubPatchOpUtil extends SharedSubPatchOpUtil {}

export default new SubPatchOpUtil(utilProvider);
