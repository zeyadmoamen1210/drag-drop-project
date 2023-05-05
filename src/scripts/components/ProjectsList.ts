import { autoBind } from '../decorators/autoBind.js';
import { ProjectRules } from '../store/ProjectRules.js';
import { projectState } from '../store/ProjectState.js';
import { ProjectStatus } from '../utils/project_status.js';
import { Base } from './Base.js';
import { ProjectItem } from './ProjectItem.js';

export class ProjectsList extends Base<HTMLDivElement> {

    constructor(private _status: ProjectStatus) {
        super("projects-list", "app", false, `${_status}-projects`);
        this.renderProjectsList();

        if( JSON.parse(localStorage.getItem("projects")!) ) {
           const localStorageProjects = JSON.parse(localStorage.getItem("projects")!);
           this._showProjectsInDOM(localStorageProjects)
        }

        projectState.pushListner((projects: ProjectRules[]) => {
            this._showProjectsInDOM(projects)
        });

        this._runDragging();
    }


    private _showProjectsInDOM(projects: ProjectRules[]): void {
        const filteredProjects = this._filterProjectsStatus(projects);
        this._renderProjects(filteredProjects);
    }
    
    /**
     * @desc render projects list specify own status
     */
    private renderProjectsList() :void {
        const title = this.element.querySelector('.title')! as HTMLHeadingElement;
        const list = this.element.querySelector('ul')! as HTMLUListElement;

        title.textContent = `${this._status} Projects`;
        
        list.id = `${this._status}-list`;
    }

    private _renderProjects(projects: ProjectRules[]):void {
        const projectsList = document.querySelector(`#${this._status}-list`) as HTMLDivElement;
        projectsList.innerHTML = "";
        for(const project of projects) {
            new ProjectItem(`${this._status}-list`, project); 
        }
    }

    private _filterProjectsStatus(projects: ProjectRules[]): ProjectRules[] {
        return projects.filter(project => project.statue === this._status)
    }

    private _runDragging(): void {
        this.element.addEventListener('dragover', this._handleDragOver);
        this.element.addEventListener('dragleave', this._handleDragLeave);
        this.element.addEventListener('drop', this._handleDrop);
    }

    @autoBind
    private _handleDragOver(e: DragEvent): void {
        e.preventDefault();
    }

    @autoBind
    private _handleDrop(e: DragEvent): void {
        const projectId = e.dataTransfer!.getData('text/plain');
        let newStatus:ProjectStatus = ProjectStatus.Initial;
        if(this.element.id === "Initial-projects") newStatus = ProjectStatus.Initial;
        if(this.element.id === "Finished-projects") newStatus = ProjectStatus.Finished;
        if(this.element.id === "Active-projects") newStatus = ProjectStatus.Active;

        projectState.changeStatus(projectId, newStatus)
    }

    @autoBind
    private _handleDragLeave(e: DragEvent) :void {
    }
 }
