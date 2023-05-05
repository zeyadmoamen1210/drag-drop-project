import { ProjectStatus } from "../utils/project_status.js";
import { ProjectRules } from "./ProjectRules.js";
class ProjectState {
    constructor() {
        this._projects = [];
        this._listeners = [];
        this._localStorageProjects = localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : [];
        this._projects = this._localStorageProjects;
    }
    changeStatus(projectId, newStatus) {
        const proj = this._projects.find((project) => project.id === projectId);
        console.log(proj);
        if (proj && proj.statue !== newStatus) {
            console.log(proj);
            proj.statue = newStatus;
            this._runListners();
            localStorage.setItem("projects", JSON.stringify(this._projects));
        }
    }
    static _getInstance() {
        if (this._instance) {
            return this._instance;
        }
        else {
            this._instance = new ProjectState();
            return this._instance;
        }
    }
    createProject(title, description) {
        const newProject = new ProjectRules(Math.random().toString(), title, description, ProjectStatus.Initial);
        this._projects.push(newProject);
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }
    removeProject(projectId) {
        const projectsAfter = this._projects.filter((p) => p.id !== projectId);
        this._projects = projectsAfter;
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }
    _runListners() {
        for (const listner of this._listeners) {
            listner([...this._projects]);
        }
    }
    pushListner(listner) {
        this._listeners.push(listner);
    }
}
export const projectState = ProjectState._getInstance();
//# sourceMappingURL=ProjectState.js.map