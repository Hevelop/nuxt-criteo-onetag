import { resolve } from "node:path";

export default function CriteoOnetagModule(moduleOptions) {
  const options = {
    ...this.options.criteoOnetag,
    ...moduleOptions,
  };

  // check if module is enabled
  if (!!options.enabled === false) {
    return;
  }

  // Expose a plugin for tracking events
  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "criteo-onetag.js",
    options,
  });
}
