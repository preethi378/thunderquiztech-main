export declare class Server {
    app: any;
    constructor();
    setConfigurations(): void;
    configureBodyparser(): void;
    configureEjs(): void;
    configureSession(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
