export declare class GlobalMiddleWares {
    static checkError(req: any, res: any, next: any): void;
    static auth(req: any, res: any, next: any): Promise<any>;
    static identifyClient(req: any, res: any, next: any): Promise<any>;
    static checkAdminSession(req: any, res: any, next: any): Promise<void>;
}
