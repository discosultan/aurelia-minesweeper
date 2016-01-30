export function configure(aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .eventAggregator()
    .plugin('aurelia-animator-css');
    // .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
