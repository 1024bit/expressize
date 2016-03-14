var path = require('path'),
  fs = require('fs');

module = module.exports = function(fn) {
  return {
    "__express": function(templatePath, options, callback) {
      templatePath = path.resolve(__dirname, templatePath);
      fs.readFile(templatePath, 'utf8', function(err, data) {
        if (err) {
          return callback(err, null);
        }
        var output = fn.apply(this, [data, options]);
        callback(null, output);
      });
    }
  };
}
