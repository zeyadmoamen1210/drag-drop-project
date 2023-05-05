var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";
var ProjectItem = /** @class */ (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(projectListId, project) {
        var _this = _super.call(this, 'project-item', projectListId, false, project.id) || this;
        _this._project = project;
        _this._renderProject();
        _this._deleteProject();
        return _this;
    }
    ProjectItem.prototype._renderProject = function () {
        var title = this.element.querySelector('.project_title');
        var desc = this.element.querySelector('.project_desc');
        title.textContent = this._project.title;
        desc.textContent = this._project.description;
    };
    ProjectItem.prototype._deleteProject = function () {
        var deleteBtn = this.element.querySelector(".delete");
        deleteBtn.addEventListener('click', this._deleteHandler);
    };
    ProjectItem.prototype._deleteHandler = function (e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this project')) {
            projectState.removeProject(this._project.id);
        }
    };
    return ProjectItem;
}(Base));
export { ProjectItem };
