var sys = require('sys');
var fs = require('fs');
var Mu = require('./lib/mu');



/*
 * Include some instructions for when I forget how this works.
 */
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

if (process.argv.length != 4) {
	usage("Incorrect number of arguments.");
}

renderWrapper(process.argv[2], process.argv[3]);



  	
