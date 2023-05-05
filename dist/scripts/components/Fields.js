var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoBind } from '../decorators/autoBind.js';
import { projectState } from '../store/ProjectState.js';
import { assignValidateInputs, handleValidationErrors } from '../utils/validation_helpers.js';
import { Base } from './Base.js';
export class Fields extends Base {
    constructor() {
        super("fields", "app", true, "form");
        this._addProject();
    }
    _validateInputValues(titleVal, descVal) {
        const [titleInputRule, descInputRule] = assignValidateInputs(titleVal, descVal);
        const titleErrorMsg = handleValidationErrors(titleInputRule);
        const descErrorMsg = handleValidationErrors(descInputRule);
        let popupContainer = document.querySelector('#popup_container');
        const popupDescription = document.querySelector(".desc_popup");
        if (titleErrorMsg.length) {
            popupContainer.classList.add("visible_popup");
            popupDescription.textContent = titleErrorMsg;
            return false;
        }
        else if (descErrorMsg) {
            popupContainer.classList.add("visible_popup");
            popupDescription.textContent = descErrorMsg;
            return false;
        }
        return true;
    }
    _addProject() {
        this.element.addEventListener('submit', this._handleAddProject);
    }
    _handleAddProject(e) {
        e.preventDefault();
        const [titleInput, descriptionInput] = this._targetInputs();
        const [titleVal, descVal] = this._getInputsValues(titleInput, descriptionInput);
        if (this._validateInputValues(titleVal, descVal)) {
            projectState.createProject(titleVal, descVal);
            this._cleanInputValues(titleInput, descriptionInput);
        }
    }
    _cleanInputValues(titleInput, descriptionInput) {
        titleInput.value = descriptionInput.value = "";
    }
    _getInputsValues(titleInput, descInput) {
        return [
            titleInput.value,
            descInput.value
        ];
    }
    _targetInputs() {
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");
        return [titleInput, descriptionInput];
    }
}
__decorate([
    autoBind
], Fields.prototype, "_handleAddProject", null);
//# sourceMappingURL=Fields.js.map