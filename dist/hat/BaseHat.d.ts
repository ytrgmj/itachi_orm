/**
 * 帽子的父类
 */
import { Context } from 'itachi_core';
export default abstract class BaseHat {
    protected _opt: any;
    protected _fun: Function;
    constructor(opt: any);
    abstract process(list: Array<any>): Promise<Array<any>>;
    protected getContext(): Context;
    processOne(row: any): Promise<any>;
}
