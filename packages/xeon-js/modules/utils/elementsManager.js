import XSET from "../xset";


HTMLElement.prototype.update = function (XSETObject) {
      this.clear();
      this.appendChild(XSET(XSETObject));
}

HTMLElement.prototype.appendXSET = function (XSETObject) {
      this.appendChild(XSET(XSETObject));
}

HTMLElement.prototype.clear = function () {
      while (this.firstChild) {
            this.removeChild(this.firstChild);
      }
      return this;
}