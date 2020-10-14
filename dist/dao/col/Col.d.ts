/**
代表查询中的一个列
各种形式:
    t.xx as yy,
    xx,
    xx+yy as zz,
    sum(xx) as yy,
    distinct yy
*/
import { Formula } from 'itachi_core';
export default class Col {
    private _colName;
    private _name;
    private _formula;
    constructor(str?: string);
    parse(str: any): void;
    /**
    为havingcol
    */
    parseHavingCol(cdt: Cdt): void;
    _parseColName(name: any): any;
    _startWithCount(name: any): boolean;
    _parseCount(name: any): string;
    getName(): string;
    getColName(): string;
    /**
    读取es的查询结果集合
    */
    parseEsHitResult(data: any, row: any): void;
    /**
    读取ess 的 agg result
    */
    parseEsAggResult(data: any, row: any): void;
    acqFormula(): Formula;
    acqFormulaString(): any;
    toString(): string;
    hasAgg(): boolean;
    /**
    设置查询es的时候的egg
    */
    parseEsAgg(param: any): any;
    parseEsGroupParam(param: any): {
        terms: {
            size: number;
        };
    };
    toEsGroupParam(): {
        [x: number]: {
            terms: {
                size: number;
            };
        };
    };
    /**
    设置es 的group查询的select 后面的col

    */
    parseEsGroupSchCol(param: any): void;
    parseEsHaving(param: any): string;
}
import { Cdt } from '../query/cdt/imp';
