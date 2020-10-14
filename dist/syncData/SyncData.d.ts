import { Context } from 'itachi_core';
import { Dao, Query } from '../orm';
interface SyncDataOpt {
    context: Context;
    /**
     * 表格名称
     */
    tableName: string;
    /**
     * 同步的字段 ，默认sort is_del name
     */
    cols?: Array<string>;
    /**
     * 当前level 默认为brand
     */
    level?: string;
    /**
     * 其他条件
     */
    otherCdt?: any;
    /**
     * 不需要搜索level
     */
    noNeedSchLevel?: any;
}
/**
 * 用于同步数据，将level=brand 的数据同步到其他级别下
 */
export default class SyncData {
    _opt: SyncDataOpt;
    constructor(opt: SyncDataOpt);
    getLevel(): string;
    noNeedSchLevel(): boolean;
    buildQuery(list: Array<any>): Promise<Query>;
    _find(list: Array<any>): Promise<Array<any>>;
    syncData(list: Array<any>): Promise<void>;
    getTableName(): string;
    protected getDao(): Dao;
    protected getNoCol(): string;
    protected getIdCol(): string;
    protected isSame(data: any, data1: any): boolean;
    protected getCols(): Array<string>;
}
export {};
