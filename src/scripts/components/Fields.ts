import { autoBind } from '../decorators/autoBind.js';
import { projectState } from '../store/ProjectState.js';
import { assignValidateInputs, handleValidationErrors } from '../utils/validation_helpers.js';
import { Base } from './Base.js';

export class Fields extends Base<HTMLFormElement>{

    constructor() {
        super("fields", "app", true, "form"); 
        this._addProject();
    }

    private _validateInputValues(titleVal: string, descVal: string): boolean {
        const [titleInputRule, descInputRule] = assignValidateInputs(titleVal, descVal);
        const titleErrorMsg = handleValidationErrors(titleInputRule);
        const descErrorMsg = handleValidationErrors(descInputRule);

        let popupContainer = document.querySelector('#popup_container')! as HTMLDivElement;
        const popupDescription = document.querySelector(".desc_popup")! as HTMLParagraphElement;

        if(titleErrorMsg.length) {
            popupContainer.classList.add("visible_popup");
            popupDescription.textContent = titleErrorMsg;
            return false;
        }else if (descErrorMsg) {
            popupContainer.classList.add("visible_popup");
            popupDescription.textContent = descErrorMsg;
            return false;
        }
        return true;
    }

    
    private _addProject(): void {
        this.element.addEventListener('submit', this._handleAddProject)
    }

    /**
     * @desc handle add projects
     */
    
    @autoBind
    private _handleAddProject(e: Event): void {
        e.preventDefault();
        const [titleInput, descriptionInput] = this._targetInputs();
        const [titleVal, descVal] = this._getInputsValues(titleInput, descriptionInput);
        if(this._validateInputValues(titleVal, descVal)) {
            projectState.createProject(titleVal, descVal);
            this._cleanInputValues(titleInput, descriptionInput)
        }
    }


    private _cleanInputValues(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement):void {
        titleInput.value = descriptionInput.value = "";
    }

    /**
     * @desc get inputs values
     * @param1 titleInput : HTMLInputElement
     * @param2 descInput : HTMLInputElement
     * @retures return [inputVal, descVal] : string[]
     */
    private _getInputsValues(titleInput: HTMLInputElement, descInput: HTMLInputElement): string[] {
        return [
            titleInput.value,
            descInput.value
        ]
    }

    /**
     * @desc get project inputs
     * @retures return inputs after get : HTMLInputElement[]
     */
    private _targetInputs(): HTMLInputElement[] {
        const titleInput = document.getElementById("title")! as HTMLInputElement;
        const descriptionInput = document.getElementById("description")! as HTMLInputElement;
        return [titleInput, descriptionInput];
    }
}
