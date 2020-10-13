/**
 * 表示一个sql
 */
import ISql from './ISql';
export default class Sql implements ISql {
    private _sql;
    private _val;
    private _other;
    clazz: string;
    constructor(sql?: String, val?: any);
    getSql(): this;
    toSql(type?: string, count?: object): String;
    toVal(): Array<object>;
    add(sql: Sql | String | string): Sql;
    /**
     * @description cols 格式化
     * @param cols
     */
    protected _colsToArray(cols: string | string[]): string[];
}
