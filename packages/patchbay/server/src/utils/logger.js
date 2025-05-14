import { SharedLogger } from "@cables/api";

export default class Logger extends SharedLogger {
  constructor(provider) {
    super(provider);
    // const logFormat = "[electron-{processType}] {d}.{m}.{y} {h}:{i}:{s} {text}";
    // log.transports.file.maxSize = 20 * 1024 * 1024;
    // log.initialize();
    // log.transports.console.format = logFormat;
    // log.transports.file.format = logFormat;
    // log.transports.ipc.level = "debug";

    this.loadStart = performance.now();
    this.startUpLog = [];
  }

  debug(...args) {
    console.debug("[" + this._initiator + "]", "DEBUG", args.join(" "));
  }

  endTime(...args) {
    super.endTime(...args);
  }

  error(...args) {
    console.error(
      "[" + this._initiator + "]",
      "ERROR",
      args.join(" "),
      this._getContext(args),
    );
  }

  info(...args) {
    console.info("[" + this._initiator + "]", args.join(" "));
  }

  startTime(...args) {
    super.startTime(...args);
  }

  uncaught(...args) {
    console.error(
      "[" + this._initiator + "]",
      "UNCAUGHT",
      args.join(" "),
      this._getContext(args),
    );
  }

  verbose(...args) {
    console.verbose("[" + this._initiator + "]", args.join(" "));
  }

  warn(...args) {
    console.warn("[" + this._initiator + "]", "WARN", args.join(" "));
  }

  event(...args) {
    console.verbose("[" + this._initiator + "]", args.join(" "));
  }

  logStartup(title) {
    const time =
      Math.round(((performance.now() - this.loadStart) / 1000) * 100) / 100;
    this.startUpLog.push({
      title: title,
      time: time,
    });
    this.debug(title + " (" + time + "s)");
  }
}
