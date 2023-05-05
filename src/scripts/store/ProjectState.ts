import { ProjectStatus } from "../utils/project_status.js";
import { ListnerType } from "./ListnerType.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
    private static _instance: ProjectState;
    private _projects: ProjectRules[] = [];
    private _listeners: ListnerType[] = [];
    private _localStorageProjects: ProjectRules[] = localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")!) : [];
    
    constructor() {
        this._projects = this._localStorageProjects;
    }


    public changeStatus(projectId: string, newStatus: ProjectStatus): void {
        const proj = this._projects.find((project) => project.id === projectId);
        console.log(proj)
        if(proj && proj.statue !== newStatus) {
        console.log(proj)

            proj.statue = newStatus;
            this._runListners();
            localStorage.setItem("projects", JSON.stringify(this._projects));
        }
    }
    /**
     * @desc create a signleton instance
     * @returns return the instance of the project state : ProjectState
     */
    public static _getInstance(): ProjectState {
        if(this._instance) {
            return this._instance;
        }else {
            this._instance = new ProjectState();
            return this._instance;
        }
    }

    /**
     * @desc create a new instance of the projectRules and push to project array
     * @param1 title 
     * @param2 description 
     */
    public createProject(title: string, description: string) {
        const newProject = new ProjectRules(
            Math.random().toString(), 
            title, 
            description, 
            ProjectStatus.Initial
        );
        this._projects.push(newProject);
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }

    public removeProject(projectId: string):void {
        const projectsAfter = this._projects.filter((p: ProjectRules) => p.id !== projectId);
        this._projects = projectsAfter;
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }

    private _runListners() :void {
        for(const listner of this._listeners) {
            listner([...this._projects])
        }
    }

    public pushListner(listner: ListnerType) {
        this._listeners.push(listner);
    }
}

export const projectState = ProjectState._getInstance();