import { autoBind } from "../decorators/autoBind.js";
import { ProjectRules } from "../store/ProjectRules.js";
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";

export class ProjectItem extends Base<HTMLDivElement> {
    private _project: ProjectRules
    constructor(projectListId: string, project: ProjectRules) {
        super('project-item', projectListId, false, project.id);
        this._project = project;
        this._renderProject();
        this._deleteProject();
        this._runDragging();
    }

    private _renderProject():void {
        const title = this.element.querySelector('.project_title')! as HTMLHeadingElement;
        const desc = this.element.querySelector('.project_desc')! as HTMLParagraphElement;
        title.textContent = this._project.title;
        desc.textContent = this._project.description;
    }

    
    private _deleteProject() {
        const deleteBtn = this.element.querySelector(".delete")! as HTMLButtonElement;
        deleteBtn.addEventListener('click', this._deleteHandler)
    }

    @autoBind
    private _deleteHandler(e: Event) {
        e.preventDefault();
        if(confirm('Are you sure you want to delete this project')) {
            projectState.removeProject(this._project.id)
        }
    }

    private _runDragging():void {
        this.element.addEventListener('dragstart', this._handleDragStart);
        this.element.addEventListener('dragend', this._handleDragEnd);
    }   

    @autoBind
    private _handleDragStart(e: DragEvent):void {
        this.element.style.opacity = '.6';
        e.dataTransfer!.setData('text/plain',this._project.id);
        e.dataTransfer!.effectAllowed = "move";
    }

    @autoBind
    private _handleDragEnd(e: DragEvent):void {
        this.element.style.opacity = '1';
    }
}