export class PlivoGenericResponse {
    constructor(params: any, idString: any);
    id: any;
}
export class PlivoResource {
    constructor(action: any, klass: any, idField: any, request: any);
    update(params: any, id: any): Promise<any>;
    delete(params: any): Promise<any>;
    executeAction(task: string, method: string, params: {}, action: any): Promise<any>;
    customexecuteAction(url: any, method?: string, params?: {}): Promise<any>;
    customexecuteGetNumberAction(url: any, method?: string, params?: {}): any;
    getMetaResponse(url: any, method?: string, params?: {}): Promise<any>;
}
export class PlivoResourceInterface {
    constructor(action: any, klass: any, idField: any, request: any);
    get(id: any, params?: {}): Promise<any>;
    list(params: any): Promise<any>;
    create(params: any): Promise<any>;
}
