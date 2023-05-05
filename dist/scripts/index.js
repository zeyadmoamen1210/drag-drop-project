import { Fields } from './components/Fields.js';
import { ProjectsList } from './components/ProjectsList.js';
import { Popup } from './components/Popup.js';
import { ProjectStatus } from './utils/project_status.js';
new Fields();
new ProjectsList(ProjectStatus.Initial);
new ProjectsList(ProjectStatus.Active);
new ProjectsList(ProjectStatus.Finished);
new Popup();
//# sourceMappingURL=index.js.map