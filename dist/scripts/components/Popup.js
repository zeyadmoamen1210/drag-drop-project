import { Base } from "./Base.js";
export class Popup extends Base {
    constructor() {
        super("popup_template", "app", false, "popup_container");
        this._closePopup();
    }
    _closePopup() {
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.element.classList.remove('visible_popup');
        });
    }
}
//# sourceMappingURL=Popup.js.map