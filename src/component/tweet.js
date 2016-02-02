import {bindable, inject, computedFrom, BindingEngine, TaskQueue} from 'aurelia-framework';
import 'twitter'; // This will load 'twttr' as global.

@inject(BindingEngine, TaskQueue)
export class Tweet {
  _refreshCounter = 0;
  _subscriptions = [];
  visible = false;

  // API ref: https://dev.twitter.com/web/tweet-button/parameters

  // Tweet content parameters.
  @bindable text = '';
  @bindable url = '';
  @bindable hashtags = '';
  @bindable via = '';
  @bindable related = '';

  // Button display parameters.
  @bindable size = '';
  @bindable lang = '';
  @bindable dnt = '';

  constructor(bindingEngine, taskQueue) {
    this._bindingEngine = bindingEngine;
    this._taskQueue = taskQueue;
  }

  attached() {
    let propertiesToObserve = ['text', 'url', 'hashtags', 'via', 'related', 'size', 'lang', 'dnt'];
    for (let property of propertiesToObserve)
      this._subscriptions.push(this._bindingEngine.propertyObserver(this, property).subscribe(this._updateWidget.bind(this)));
    this._updateWidget();
  }

  detached() {
    for (let subscription of this._subscriptions)
      subscription.dispose();
    this._subscriptions.length = 0;
  }

  // Since the twttr widget loader REMOVES the template anchor tag from the DOM, we need a way to
  // re-add it every time we want to update the button. Updating _refreshCounter will mark the property
  // as dirty, causing Aurelia to re-render it to the DOM, allowing us to reload the twitter button widget.
  @computedFrom('_refreshCounter')
  get templateContent() {
    return `<a class="twitter-share-button" href="https://twitter.com/intent/tweet"
        data-text="${this.text}"
        data-url="${this.url}"
        data-hashtags="${this.hashtags}"
        data-via="${this.via}"
        data-related="${this.related}"
        data-size="${this.size}"
        data-lang="${this.lang}"
        data-dnt="${this.dnt}">
        Tweet
      </a>`;
  }

  _updateWidget() {
    this.visible = false;
    this._refreshCounter++;
    // We need to queue a task in order to run it AFTER the DOM's template is updated.
    this._taskQueue.queueMicroTask(() => twttr.widgets.load().then(() => this.visible = true));
  }
}
