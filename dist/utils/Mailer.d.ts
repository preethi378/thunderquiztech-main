export declare class Mailer {
    private static initializeTransport;
    static sendEmail(data: {
        to: [string];
        subject: string;
        text?: string;
        data?: any;
        template?: string;
    }): void;
}
