var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoBind } from "../decorators/autoBind.js";
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";
export class ProjectItem extends Base {
    constructor(projectListId, project) {
        super('project-item', projectListId, false, project.id);
        this._project = project;
        this._renderProject();
        this._deleteProject();
        this._runDragging();
    }
    _renderProject() {
        const title = this.element.querySelector('.project_title');
        const desc = this.element.querySelector('.project_desc');
        title.textContent = this._project.title;
        desc.textContent = this._project.description;
    }
    _deleteProject() {
        const deleteBtn = this.element.querySelector(".delete");
        deleteBtn.addEventListener('click', this._deleteHandler);
    }
    _deleteHandler(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this project')) {
            projectState.removeProject(this._project.id);
        }
    }
    _runDragging() {
        this.element.addEventListener('dragstart', this._handleDragStart);
        this.element.addEventListener('dragend', this._handleDragEnd);
    }
    _handleDragStart(e) {
        this.element.style.opacity = '.6';
        e.dataTransfer.setData('text/plain', this._project.id);
        e.dataTransfer.effectAllowed = "move";
    }
    _handleDragEnd(e) {
        this.element.style.opacity = '1';
    }
}
__decorate([
    autoBind
], ProjectItem.prototype, "_deleteHandler", null);
__decorate([
    autoBind
], ProjectItem.prototype, "_handleDragStart", null);
__decorate([
    autoBind
], ProjectItem.prototype, "_handleDragEnd", null);
//# sourceMappingURL=ProjectItem.js.map