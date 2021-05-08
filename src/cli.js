var fs = require('fs');
var opf = require('./opf');

var verboseMode = false;

function verboseLog(text) {
    if(verboseMode) {
        console.log(text);
    }
}

function syntax() {
    console.log("Syntax: opf [-h] [-v] -i input.xml -o output.xml");
    process.exit(0);
}

function main() {
    var opts = require('minimist')(process.argv.slice(2), {
        string: ['i', 'o'],
        boolean: ['h', 'v'],
        alias: {
            input: 'i',
            output: 'o',
            help: 'h',
            verbose: 'v'
        }
    });

    if(opts.help || !opts.input || !opts.output) {
        syntax();
    }
    if(opts.verbose) {
        verboseMode = true;
    }

    if(!fs.existsSync(opts.input)) {
        console.error("ERROR: File does not exist: " + opts.input);
        process.exit(1);
    }

    verboseLog("Reading: " + opts.input);
    var rawXML = fs.readFileSync(opts.input, "utf8");
    var outputXML = opf(rawXML, {});
    verboseLog("Writing: " + opts.output);
    fs.writeFileSync(opts.output, outputXML);
}

main();
