import {inject} from 'aurelia-framework';
import {CssAnimator} from 'aurelia-animator-css';

@inject(Element, CssAnimator)
export class SlideCustomAttribute {
  _animationQueue = [];
  _class = 'slide';

  constructor(element, animator) {
    this._element = element;
    this._animator = animator;
  }

  valueChanged(newValue, oldValue) {
    const method = newValue
      ? () => this._animator.addClass(this._element, this._class)
      : () => this._animator.removeClass(this._element, this._class);

    if (this._inProgress) { // Queue animation.
      this._animationQueue.push(method);
    } else { // Run animation.
      this._runAnimation(method);
    }
  }

  _runAnimation(method) {
    this._inProgress = true;
    method().then(() => {
      if (this._animationQueue.length > 0) {
        var queuedMethod = this._animationQueue.splice(0, 1)[0];
        this._runAnimation(queuedMethod);
      } else {
        this._inProgress = false;
      }
    });
  }
}
