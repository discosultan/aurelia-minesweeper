export class HtmlEncodeValueConverter {
  toView(string) {
    return encodeURIComponent(string);
  }
}
