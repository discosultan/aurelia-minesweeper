import {inject, customAttribute} from 'aurelia-framework';
import Hammer from 'hammerjs';

let gestures = ['press', 'tap'];
for (let gesture of gestures) {
  @customAttribute(`hammer-${gesture}`)
  @inject(Element)
  export class HammerCustomAttribute {
    constructor(element) {
      this.hammer = element.data('hammer');

      // Check if Hammer manager exists for element; if not, create new.
      if (!hammer) {
        this.hammer = new Hammer.Manager(element, {
        });
      }

      this.hammer.add(this._getRecognizerFromGesture(gesture));
    }

    attached() {
      this.hammer.on(gesture, this._handleGesture.bind(this));
    }

    detached() {
      this.hammer.off(gesture, this._handleGesture.bind(this));
    }

    valueChanged(newValue) {
      this.callback = newValue;
    }

    _handleGesture(event) {
      this.callback.call(null, event)
    }

    _getRecognizerFromGesture(gesture) {
      switch (gesture) {
        case 'press':
          return new Hammer.Press();
        case 'tap':
          return new Hammer.Tap();
        default:
          throw `Unknown gesture: ${gesture}`;
      }
    }
  }
}
