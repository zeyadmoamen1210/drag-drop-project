var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Base } from "./Base.js";
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super.call(this, "popup_template", "app", false, "popup_container") || this;
        _this._closePopup();
        return _this;
    }
    Popup.prototype._closePopup = function () {
        var _this = this;
        var closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', function (event) {
            event.preventDefault();
            _this.element.classList.remove('visible_popup');
        });
    };
    return Popup;
}(Base));
export { Popup };
