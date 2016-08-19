import {bindable} from 'aurelia-framework';
import {MouseButton} from '../../utility/input';

export class Tweet {
  // Tweet content parameters.
  @bindable text = '';
  @bindable url = '';
  @bindable hashtags = '';

  constructor(bindingEngine, taskQueue) {
    this._bindingEngine = bindingEngine;
    this._taskQueue = taskQueue;
    this.url = window.location.href;
  }

  get shareLink() {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.text)}&url=${encodeURIComponent(this.url)}&hashtags=${encodeURIComponent(this.hashtags)}`;
  }

  onClick(evt) {
    if (evt.which == MouseButton.Left) {
      // https://dev.twitter.com/docs/intents
			const width = 550, height = 420;
			const winWidth = window.screen.width, winHeight = window.screen.height;
			const left = Math.round((winWidth / 2) - (width / 2));
      const top = winHeight > height ? Math.round((winHeight / 2) - (height / 2)) : 0;

			window.open(this.link.href, 'share', `scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=${width},height=${height},left=${left},top=${top}`);
			evt.preventDefault();      
    }
  }
}
