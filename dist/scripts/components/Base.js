export class Base {
    constructor(_templateId, _hostId, _posElementStart, _elementId) {
        this._templateId = _templateId;
        this._hostId = _hostId;
        this._posElementStart = _posElementStart;
        this._elementId = _elementId;
        const [_template, _] = this._targetElements(this._templateId, this._hostId);
        const templateContent = document.importNode(_template.content, true);
        this.element = templateContent.firstElementChild;
        if (this._elementId) {
            this.element.id = this._elementId;
            this._insertElement(this._posElementStart);
        }
    }
    _targetElements(templateId, hostId) {
        this._template = document.getElementById(templateId);
        this._hostElement = document.getElementById(hostId);
        return [this._template, this._hostElement];
    }
    _insertElement(positionStart) {
        const isInsertedStart = positionStart ? 'afterbegin' : 'beforeend';
        this._hostElement.insertAdjacentElement(isInsertedStart, this.element);
    }
}
//# sourceMappingURL=Base.js.map