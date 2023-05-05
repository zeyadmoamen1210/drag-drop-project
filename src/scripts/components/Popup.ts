import { Base } from "./Base.js";

export class Popup extends Base<HTMLDivElement> {

    constructor() {
        super("popup_template", "app", false, "popup_container");
        this._closePopup();
    }

    private _closePopup() {
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.element.classList.remove('visible_popup');
        })
    }

}