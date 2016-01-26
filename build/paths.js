var appRoot = 'src/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: './style/**/*.css',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  doc: './doc',
};
