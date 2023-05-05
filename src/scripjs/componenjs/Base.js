var Base = /** @class */ (function () {
    function Base(_templateId, _hostId, _posElementStart, _elementId) {
        this._templateId = _templateId;
        this._hostId = _hostId;
        this._posElementStart = _posElementStart;
        this._elementId = _elementId;
        var _a = this._targetElements(this._templateId, this._hostId), _template = _a[0], _ = _a[1];
        // import template content
        var templateContent = document.importNode(_template.content, true);
        // assign element to render
        this.element = templateContent.firstElementChild;
        if (this._elementId) {
            this.element.id = this._elementId;
            this._insertElement(this._posElementStart);
        }
    }
    /**
     * @desc target template , host
     * @returns template : HTMLTemplateElement , host : HTMLDivElement
     * @param1 templateId : string
     * @param2 hostId : string
    */
    Base.prototype._targetElements = function (templateId, hostId) {
        // assign template element 
        this._template = document.getElementById(templateId);
        // assign host element
        this._hostElement = document.getElementById(hostId);
        return [this._template, this._hostElement];
    };
    /**
     * @desc Insert element in position start or end
     * @param positionStart : boolean
     */
    Base.prototype._insertElement = function (positionStart) {
        var isInsertedStart = positionStart ? 'afterbegin' : 'beforeend';
        this._hostElement.insertAdjacentElement(isInsertedStart, this.element);
    };
    return Base;
}());
export { Base };
