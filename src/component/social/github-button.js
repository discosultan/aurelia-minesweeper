import {bindable} from 'aurelia-framework';

export class GithubButton {

  // API doc from https://ghbtns.com

  // Required parameters.
  @bindable user;
  @bindable repo;
  @bindable type;

  // Optional parameters.
  @bindable count = 'none';
  @bindable size = 'none';

  @bindable width;
  @bindable height;
}
