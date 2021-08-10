export class PlivoGenericResponse {
    constructor(params: object, idString: string);
    id: string;
}
export class PlivoResource {
    constructor(action: string, Klass: Symbol, idField: string, request: any);
    update(params: object, id: string): Promise<any>;
    delete(params: object): Promise<any>;
    executeAction(task: string, method: string, params: {}, action: string): Promise<any>;
    customexecuteAction(url: string, method?: string, params?: {}): Promise<any>;
    customexecuteGetNumberAction(url: string, method?: string, params?: {}): any;
    getMetaResponse(url: string, method?: string, params?: {}): Promise<any>;
}
export class PlivoResourceInterface {
    constructor(action: string, Klass: Symbol, idField: string, request: any);
    get(id: string, params?: {}): Promise<any>;
    list(params: object): Promise<any>;
    create(params: object): Promise<any>;
}
