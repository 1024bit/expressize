var path = require('path'),
  fs = require('fs');

module = module.exports = function(fn) {
  return {
    "__express": function(templatePath, options, callback) {
      templatePath = path.resolve(__dirname, templatePath);
      fs.readFile(templatePath, 'utf8', function(err, data) {
        var output;
        if (err) {
          return callback(err, null);
        }
        output = fn.apply(this, [data, options]);
        if (output.then) {
          output.then(function(data) {
            callback(null, data);
          }, function(err) {
            callback(err, null);
          })
        } else
          callback(null, output);
      });
    }
  };
}
