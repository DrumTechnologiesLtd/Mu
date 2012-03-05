#!/usr/bin/env node
// Simple command-line wrapper to Mu
//
// Takes a template and a context / hash file and outputs to stdout

var sys = require('sys'); // sys has been renamed to util in node 0.6
var fs = require('fs');
var Mu = require('./lib/mu');

main(process.argv.slice(2));

function main(argv) {
	if (argv && argv.length == 2) {
		renderWrapper(argv[0], argv[1]);
	}
	else {
		usage("Incorrect number of arguments.");
	}
}

function renderWrapper(templateFile, sourceFile) {
	var js = fs.readFileSync(sourceFile);
	js = eval('(' + js + ')');

	Mu.templateExtension = false;
	Mu.templateRoot = "";

	Mu.render(templateFile, js, {}, function (err, output) {
 		if (err) {
    		throw err;
		}	
    
 		output
 			.addListener('data', function (c) {sys.print(c);  	})
 			.addListener('end', function () { sys.puts("\n"); });
	});

}

function usage(message) {
  usageLines = [
  	"usage: cliMu <templateFile> <contextFile>",
  	"\ttemplateFile: the template file to use.", 
  	"\tcontextFile: filename containing the data to template, or other hash to use with the template.",
  	"\nTemplated output is send to stdout.",
  	];
  	
  	if (message) {
  		sys.puts("\n** Error: "+message);
  		sys.puts("");
  	}
  	
  	usageLines.forEach(function (item) { sys.puts(item); });
  	if (message) {
  		process.exit(1);
  	}
  	
  	process.exit(0);
}