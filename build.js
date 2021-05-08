var fs = require('fs');
var util = require('util');
var browserify = require('browserify');

function makeBundle(mainJS, bundleFilename, callback) {
  var b, opts;
  opts = {
    builtins: [],
    detectGlobals: false,
    insertGlobals: false
  };
  b = browserify(opts);
  b.add(mainJS);
  b.bundle(function(err, result) {
    var prepend;
    if (!err) {
      prepend = "#!/usr/bin/env node\n";
      return fs.writeFile(bundleFilename, prepend + result, function(err) {
        if (!err) {
          util.log(`Compilation finished: ${bundleFilename}`);
          return typeof callback === "function" ? callback() : void 0;
        } else {
          return util.log("Bundle write failed: " + err);
        }
      });
    } else {
      return util.log("Compilation failed: " + err);
    }
  });
};

makeBundle('./src/cli.js', "dist/cli.js");
makeBundle('./src/opf.js', "dist/opf.js");
