var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoBind } from '../decorators/autoBind.js';
import { projectState } from '../store/ProjectState.js';
import { ProjectStatus } from '../utils/project_status.js';
import { Base } from './Base.js';
import { ProjectItem } from './ProjectItem.js';
export class ProjectsList extends Base {
    constructor(_status) {
        super("projects-list", "app", false, `${_status}-projects`);
        this._status = _status;
        this.renderProjectsList();
        if (JSON.parse(localStorage.getItem("projects"))) {
            const localStorageProjects = JSON.parse(localStorage.getItem("projects"));
            this._showProjectsInDOM(localStorageProjects);
        }
        projectState.pushListner((projects) => {
            this._showProjectsInDOM(projects);
        });
        this._runDragging();
    }
    _showProjectsInDOM(projects) {
        const filteredProjects = this._filterProjectsStatus(projects);
        this._renderProjects(filteredProjects);
    }
    renderProjectsList() {
        const title = this.element.querySelector('.title');
        const list = this.element.querySelector('ul');
        title.textContent = `${this._status} Projects`;
        list.id = `${this._status}-list`;
    }
    _renderProjects(projects) {
        const projectsList = document.querySelector(`#${this._status}-list`);
        projectsList.innerHTML = "";
        for (const project of projects) {
            new ProjectItem(`${this._status}-list`, project);
        }
    }
    _filterProjectsStatus(projects) {
        return projects.filter(project => project.statue === this._status);
    }
    _runDragging() {
        this.element.addEventListener('dragover', this._handleDragOver);
        this.element.addEventListener('dragleave', this._handleDragLeave);
        this.element.addEventListener('drop', this._handleDrop);
    }
    _handleDragOver(e) {
        e.preventDefault();
    }
    _handleDrop(e) {
        const projectId = e.dataTransfer.getData('text/plain');
        let newStatus = ProjectStatus.Initial;
        if (this.element.id === "Initial-projects")
            newStatus = ProjectStatus.Initial;
        if (this.element.id === "Finished-projects")
            newStatus = ProjectStatus.Finished;
        if (this.element.id === "Active-projects")
            newStatus = ProjectStatus.Active;
        projectState.changeStatus(projectId, newStatus);
    }
    _handleDragLeave(e) {
    }
}
__decorate([
    autoBind
], ProjectsList.prototype, "_handleDragOver", null);
__decorate([
    autoBind
], ProjectsList.prototype, "_handleDrop", null);
__decorate([
    autoBind
], ProjectsList.prototype, "_handleDragLeave", null);
//# sourceMappingURL=ProjectsList.js.map