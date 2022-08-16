export interface Environment {
    db_options: {
        username: string;
        password: string;
        host: string;
        db: string;
    };
    img_base_url: string;
    jwt_secret: string;
    jwt_expires_in: string;
    imageUploadPath: string;
    mailer_options: {};
    base_url: string;
}
export declare function getEnvironmentVariables(): Environment;
