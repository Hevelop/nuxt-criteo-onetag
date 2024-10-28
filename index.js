import { resolve } from "node:path";

export default function CriteoOnetagModule(moduleOptions) {
  const options = {
    id: "", // Criteo OneTag ID
    ...this.options.criteoOnetag,
    ...moduleOptions,
  };

  // check if module is enabled
  if (!!options.enabled === false) {
    return;
  }

  if (!options.id) {
    throw new Error("Criteo OneTag ID is required");
  }

  this.options.head.script = this.options.head.script || [];
  this.options.head.script.push({
    hid: "criteo-onetag",
    src: `https://dynamic.criteo.com/js/ld/ld.js?a=${options.id}`,
    async: true,
  });

  // Expose a plugin for tracking events
  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "criteo-onetag.js",
    options,
  });
}
