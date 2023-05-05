import { ProjectStatus } from "../utils/project_status.js";

export class ProjectRules {
    constructor(
        public id: string , 
        public title: string, 
        public description: string, 
        public statue: ProjectStatus
    ) {}
}