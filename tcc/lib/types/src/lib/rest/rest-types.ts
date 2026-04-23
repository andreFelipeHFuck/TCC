export interface RestResponse<T> {
    message: string;
    data: T;
}

export enum RestServices {
    UNKNOWN = 'REST UNKNOWN SERVICE',
    CONNECTION = 'REST CONNECTION SERVICE',
    AUTH = 'REST AUTH SERVICE',
    USERS = 'REST USERS SERVICE',
    DATABASE = 'REST DATABASE SERVICE'
}

export enum RestDatabaseCollection {
    UNKNOWN = '',
    USER = 'USER'
}
