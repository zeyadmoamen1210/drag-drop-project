export class Base <T extends HTMLElement>{
    private _template!: HTMLTemplateElement;
    private _hostElement!: HTMLDivElement;
    public element: T;

    constructor(
        private _templateId: string,
        private _hostId: string,
        private _posElementStart: boolean,
        private _elementId: string
    ) {
        
        const [_template, _] = this._targetElements(this._templateId, this._hostId);

        // import template content
        const templateContent = document.importNode(_template.content, true);

        // assign element to render
        this.element = templateContent.firstElementChild! as T;

        if(this._elementId){
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
    private _targetElements(templateId: string, hostId: string): [HTMLTemplateElement, HTMLDivElement] {
        // assign template element 
        this._template = document.getElementById(templateId)! as HTMLTemplateElement;

        // assign host element
        this._hostElement = document.getElementById(hostId)! as HTMLDivElement;

        return [this._template, this._hostElement];
    }
    
    /**
     * @desc Insert element in position start or end
     * @param positionStart : boolean
     */
    private _insertElement(positionStart: boolean) {
        const isInsertedStart = positionStart ? 'afterbegin' : 'beforeend';
        this._hostElement.insertAdjacentElement(isInsertedStart, this.element);
    }
}