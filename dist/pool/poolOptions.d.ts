export interface BaseOption {
    readonly type?: string;
    /**
     * Database host.
     */
    readonly host: string;
    /**
     * Database host port.
     */
    readonly port: number;
    /**
     * Database username.
     */
    readonly username: string;
    /**
     * Database password.
     */
    readonly password: string;
    /**
     * Database name to connect to.
     */
    readonly database: string;
    readonly [propName: string]: any;
}
export interface PoolOptions {
    readonly default?: BaseOption;
    readonly [propName: string]: BaseOption;
}
