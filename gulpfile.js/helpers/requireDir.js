var fs = require('fs');
var path = require('path');

function requireDir(dir) {
	fs.readdirSync(dir).forEach(function(item) {
		if(fs.lstatSync(path.join(dir, item)).isDirectory()) {
			requireDir(path.join(dir, item));
		} else {
			require(path.join(dir, item));
		}
	});
}

module.exports = requireDir;