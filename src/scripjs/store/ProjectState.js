var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ProjectStatus } from "../utils/project_status.js";
import { ProjectRules } from "./ProjectRules.js";
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this._projects = [];
        this._listeners = [];
        this._localStorageProjects = localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : [];
        this._projects = this._localStorageProjects;
    }
    ProjectState.prototype.changeStatus = function (projectId, newStatus) {
    };
    /**
     * @desc create a signleton instance
     * @returns return the instance of the project state : ProjectState
     */
    ProjectState._getInstance = function () {
        if (this._instance) {
            return this._instance;
        }
        else {
            this._instance = new ProjectState();
            return this._instance;
        }
    };
    /**
     * @desc create a new instance of the projectRules and push to project array
     * @param1 title
     * @param2 description
     */
    ProjectState.prototype.createProject = function (title, description) {
        var newProject = new ProjectRules(Math.random().toString(), title, description, ProjectStatus.Initial);
        this._projects.push(newProject);
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    };
    ProjectState.prototype.removeProject = function (projectId) {
        var projectsAfter = this._projects.filter(function (p) { return p.id !== projectId; });
        this._projects = projectsAfter;
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    };
    ProjectState.prototype._runListners = function () {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listner = _a[_i];
            listner(__spreadArray([], this._projects, true));
        }
    };
    ProjectState.prototype.pushListner = function (listner) {
        this._listeners.push(listner);
    };
    return ProjectState;
}());
export var projectState = ProjectState._getInstance();
