/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-05 15:10:53
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-14 14:38:37
 */

export interface BaseOption {
    readonly type?: string // mysql

    /**
     * Database host.
     */
    readonly host: string

    /**
     * Database host port.
     */
    readonly port: number

    /**
     * Database username.
     */
    readonly username: string

    /**
     * Database password.
     */
    readonly password: string

    /**
     * Database name to connect to.
     */
    readonly database: string

    readonly [propName: string]: any
}

export interface PoolOptions {
    readonly default?: BaseOption
    readonly [propName: string]: BaseOption
}