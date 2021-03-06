// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
requirejs.config({
  // all modules loaded are relative to this path
  // e.g. require(["grid/core"]) would grab /lib/grid/core.js
  baseUrl: ".",

  // specify custom module name paths
  paths: {
    "ash": "src/ash/",
    "ash-core": "src/ash/core",
    "brejep": "lib/brejep",
    "signals": "lib/vendor/signals"
  },

  // target amd loader shim as the main module, path is relative to baseUrl.
  name: "lib/vendor/almond",

  optimize: "none",

  // files to include along with almond.  only lib/skeleton.js is defined, as
  // it pulls in the rest of the dependencies automatically.
  include: [ "ash/ash-framework" ],

  // code to wrap around the start / end of the resulting build file
  // the global variable used to expose the API is defined here
  wrap: {
    start: "(function(global, define) {\n"+
              // check for amd loader on global namespace
           "  var globalDefine = global.define;\n",

    end:   "  var library = require('ash/ash-framework');\n"+
           "  if(typeof module !== 'undefined' && module.exports) {\n"+
                // export library for node
           "    module.exports = library;\n"+
           "  } else if(globalDefine) {\n"+
                // define library for global amd loader that is already present
           "    (function (define) {\n"+
           "      define(function () { return library; });\n"+
           "    }(globalDefine));\n"+
           "  } else {\n"+
                // define library on global namespace for inline script loading
           "    global['Ash'] = library;\n"+
           "  }\n"+
           "}(this));\n"
  },

  // build file destination, relative to the build file itself
  out: "./build/ash.js"
});
